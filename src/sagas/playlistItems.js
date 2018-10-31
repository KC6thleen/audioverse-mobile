import { put, select, call } from 'redux-saga/effects'

import { Endpoints } from 'src/constants'
import * as api from 'src/services'
import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'
import { netInfoIsConnected } from 'src/utils'

function* syncLocalToServer(user, playlistId) {
  const local = yield select(selectors.getLocalPlaylistItems, playlistId)

  if (local.length) {
    const fd = new FormData()
    const data = local.map(el => ({
      playlistId: el.playlistId,
      id: el.id
    }))
    fd.append('bulk', JSON.stringify(data))
    fd.append('userId', user.userId)
    fd.append('sessionToken', user.sessionToken)

    yield call(api.postPlaylistItems, Endpoints.postPlaylistItems, fd)
  }
}

function* syncDeletedToServer(user, playlistId) {
  const deleted = yield select(selectors.getDeletedPlaylistItems, playlistId)

  if (deleted.length) {
    const bulk = deleted.map(el => ({
      playlistId: el.playlistId,
      id: el.id
    }))

    const url = `${Endpoints.deletePlaylistItems}?userId=${user.userId}&sessionToken=${user.sessionToken}&bulk=${JSON.stringify(bulk)}`
    yield call(api.deletePlaylistItems, url)
  }
}

export function* sync({ playlistId }) {
  const isConnected = yield call(netInfoIsConnected)
  const user = yield select(selectors.getUser)
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
        const allPlaylistsItems = yield select(selectors.getAllPlaylistsItems)
        const otherPlaylistsItems = allPlaylistsItems.filter(el => el.playlistId !== playlistId)
        const newPlaylistsItems = [
          ...otherPlaylistsItems,
          ...response.result.result.recordings.reverse().map(el => ({
            ...el,
            playlistId: playlistId
          }))
        ]
        yield put(actions.playlistsItems.set(newPlaylistsItems))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export function* add({ playlistId, item }) {
  item.playlistId = playlistId
  const isConnected = yield call(netInfoIsConnected)
  if (isConnected) {
    try {
      const user = yield select(selectors.getUser)

      const fd = new FormData()
      fd.append('recordingId', item.id)
      fd.append('playlistId', playlistId)
      fd.append('userId', user.userId)
      fd.append('sessionToken', user.sessionToken)

      const response = yield call(api.postPlaylistItems, Endpoints.postPlaylistItems, fd)
      if (response && response.result.code === 200) {
        yield put(actions.playlistsItems.add([item]))
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

export function* addLocally(item) {
  const playlistItem = {
    ...item,
    local: true
  }
  yield put(actions.playlistsItems.add([playlistItem]))
}

export function* remove({ playlistId, id }) {
  const item = yield select(selectors.getPlaylistItem, playlistId, id)
  if (item.local) { // is local
    yield put(actions.playlistsItems.remove(item))
    return
  }

  const isConnected = yield call(netInfoIsConnected)
  if (isConnected) {
    try {
      const user = yield select(selectors.getUser)
      const bulk = [{ playlistId: playlistId, id: id }]
      const url = `${Endpoints.deletePlaylistItems}?userId=${user.userId}&sessionToken=${user.sessionToken}&bulk=${JSON.stringify(bulk)}`
      const response = yield call(api.deletePlaylistItems, url)
      if (response && response.result.code === 200) {
        yield put(actions.playlistsItems.remove(item))
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

export function* markAsRemoved(playlistId, id) {
  let all = yield select(selectors.getAllPlaylistsItems)
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
  yield put(actions.playlistsItems.set(all))
}
