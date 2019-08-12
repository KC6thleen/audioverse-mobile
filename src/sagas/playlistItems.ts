import { put, select, call } from 'redux-saga/effects'
import { Track } from 'react-native-track-player'

import { Endpoints } from '../constants'
import * as api from '../services'
import {
  setPlaylistsItems,
  addPlaylistsItems,
  removePlaylistsItems,
} from '../store/lists/actions'
import * as selectors from '../reducers/selectors'
import { netInfoIsConnected } from '../utils'
import { UserState } from '../store/user/types'

function* syncLocalToServer(user: UserState, playlistId: string) {
  const local: Track[] = yield select(selectors.getLocalPlaylistItems, playlistId)

  if (local.length) {
    const fd = new FormData()
    const data = local.map(el => ({
      playlistId: el.playlistId,
      id: el.id
    }))
    fd.append('bulk', JSON.stringify(data))
    fd.append('userId', user!.userId)
    fd.append('sessionToken', user!.sessionToken)

    yield call(api.postPlaylistItems, Endpoints.postPlaylistItems, fd)
  }
}

function* syncDeletedToServer(user: UserState, playlistId: string) {
  const deleted: Track[] = yield select(selectors.getDeletedPlaylistItems, playlistId)

  if (deleted.length) {
    const bulk = deleted.map(el => ({
      playlistId: el.playlistId,
      id: el.id
    }))

    const url = `${Endpoints.deletePlaylistItems}?userId=${user!.userId}&sessionToken=${user!.sessionToken}&bulk=${JSON.stringify(bulk)}`
    yield call(api.deletePlaylistItems, url)
  }
}

export function* sync({ playlistId }: { type: string, playlistId: string }) {
  const isConnected = yield call(netInfoIsConnected)
  const user: UserState = yield select(selectors.getUser)
  console.log('isConnected', isConnected)
  if (isConnected && user) {
    try {
      // sync local to server
      yield call(syncLocalToServer, user, playlistId)
      // sync deleted to server
      yield call(syncDeletedToServer, user, playlistId)
      // fetch all
      const url = `${Endpoints.playlistItems}/${playlistId}?userId=${user.userId}&sessionToken=${user.sessionToken}`
      const response = yield call(api.fetchPlaylistItems, url)
      // add to the store
      if (response && response.result.code === 200) {
        const allPlaylistsItems: Track[] = yield select(selectors.getAllPlaylistsItems)
        const otherPlaylistsItems = allPlaylistsItems.filter(el => el.playlistId !== playlistId)
        const newPlaylistsItems = [
          ...otherPlaylistsItems,
          ...response.result.result.recordings.reverse().map((el: Track) => ({
            ...el,
            playlistId: playlistId
          }))
        ]
        yield put(setPlaylistsItems(newPlaylistsItems))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export function* add({ playlistId, item }: { type: string, playlistId: string, item: Track }) {
  item.playlistId = playlistId
  const isConnected = yield call(netInfoIsConnected)
  if (isConnected) {
    try {
      const user: UserState = yield select(selectors.getUser)

      const fd = new FormData()
      fd.append('recordingId', item.id)
      fd.append('playlistId', playlistId)
      fd.append('userId', user!.userId)
      fd.append('sessionToken', user!.sessionToken)

      const response = yield call(api.postPlaylistItems, Endpoints.postPlaylistItems, fd)
      if (response && response.result.code === 200) {
        yield put(addPlaylistsItems([item]))
      } else {
        yield call(addLocally, item)
      }
    } catch (e) {
      yield call(addLocally, item)
    }
  } else {
    yield call(addLocally, item)
  }
}

export function* addLocally(item: Track) {
  const playlistItem = {
    ...item,
    local: true
  }
  yield put(addPlaylistsItems([playlistItem]))
}

export function* remove({ playlistId, id }: { type: string, playlistId: string, id: string }) {
  const item = yield select(selectors.getPlaylistItem, playlistId, id)
  if (item.local) { // is local
    yield put(removePlaylistsItems(item))
    return
  }

  const isConnected = yield call(netInfoIsConnected)
  if (isConnected) {
    try {
      const user: UserState = yield select(selectors.getUser)
      const bulk = [{ playlistId: playlistId, id: id }]
      const url = `${Endpoints.deletePlaylistItems}?userId=${user!.userId}&sessionToken=${user!.sessionToken}&bulk=${JSON.stringify(bulk)}`
      const response = yield call(api.deletePlaylistItems, url)
      if (response && response.result.code === 200) {
        yield put(removePlaylistsItems(item))
      } else {
        yield call(markAsRemoved, item.playlistId, item.id)
      }
    } catch (e) {
      yield call(markAsRemoved, item.playlistId, item.id)
    }
  } else {
    yield call(markAsRemoved, item.playlistId, item.id)
  }
}

export function* markAsRemoved(playlistId: string, id: string) {
  let all: Track[] = yield select(selectors.getAllPlaylistsItems)
  all = all.map(el => {
    if (!(el.playlistId === playlistId && el.id === id)) {
      return el
    } else {
      return {
        ...el,
        deleted: 1
      }
    }
  })
  yield put(setPlaylistsItems(all))
}
