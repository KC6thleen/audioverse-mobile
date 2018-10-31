import { put, select, call } from 'redux-saga/effects'

import { Endpoints } from 'src/constants'
import * as api from 'src/services'
import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'
import { netInfoIsConnected } from 'src/utils'

function* syncLocalToServer(user) {
  const local = yield select(selectors.getLocalPlaylists)

  if (local.length) {
    const fd = new FormData()
    const data = local.map(el => ({
      playlistTitle: el.title,
      playlistSummary: '',
      visibility: el.visibility,
      lang: el.lang
    }))
    fd.append('bulk', JSON.stringify(data))
    fd.append('userId', user.userId)
    fd.append('sessionToken', user.sessionToken)

    yield call(api.postPlaylists, Endpoints.postPlaylists, fd)
  }
}

function* syncDeletedToServer(user) {
  const deleted = yield select(selectors.getDeletedPlaylists)

  if (deleted.length) {
    const playlistsIds = {}
    const ids = deleted.reduce((acc, cur) => {
      playlistsIds[cur.id] = 1
      return `${acc}&id[]=${cur.id}`
    }, '')

    const url = `${Endpoints.deletePlaylists}?userId=${user.userId}&sessionToken=${user.sessionToken}${ids}`
    const response = yield call(api.deletePlaylists, url)
    if (response && response.result.code === 200) {
      yield call(deletePlaylistItems, playlistsIds)
    }
  }
}

export function* deletePlaylistItems(playlistsIds) {
  const allPlaylistsItems = yield select(selectors.getAllPlaylistsItems)
  const playlistsItems = allPlaylistsItems.filter(el => !playlistsIds.hasOwnProperty(el.playlistId))
  yield put(actions.playlistsItems.set(playlistsItems))
}

export function* sync() {
  const isConnected = yield call(netInfoIsConnected)
  const user = yield select(selectors.getUser)
  console.log('isConnected', isConnected)
  if (isConnected && user) {
    try {
      // sync local to server
      yield call(syncLocalToServer, user)
      // sync deleted to server
      yield call(syncDeletedToServer, user)
      // fetch all
      const url = `${Endpoints.playlists}?userId=${user.userId}&sessionToken=${user.sessionToken}`
      const response = yield call(api.fetchPlaylists, url)
      // add to the store
      if (response && response.result.code === 200) {
        yield put(actions.playlists.set(response.result.result))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export function* add({ item }) {
  const lang = yield select(selectors.getLanguage)
  const playlist = {
    title: item.title,
    visibility: item.public ? 1 : 0,
    lang
  }
  
  const isConnected = yield call(netInfoIsConnected)
  if (isConnected) {
    try {
      const user = yield select(selectors.getUser)
      const fd = new FormData()
      fd.append('playlistTitle', playlist.title)
      fd.append('playlistSummary', '')
      fd.append('visibility', playlist.visibility)
      fd.append('lang', lang)
      fd.append('userId', user.userId)
      fd.append('sessionToken', user.sessionToken)
      
      const response = yield call(api.postPlaylists, Endpoints.postPlaylists, fd)
      if (response && response.result.result.playlistId) {
        yield put(actions.playlists.add([{
          ...playlist,
          id: response.result.result.playlistId
        }]))
      } else {
        yield call(addLocally, playlist)
      }
    } catch (e) {
      yield call(addLocally, playlist)
    }
  } else {
    yield call(addLocally, playlist)
  }
}

export function* addLocally(item) {
  const playlist = {
    ...item,
    id: `${new Date().getTime()}`,
    local: true
  }
  yield put(actions.playlists.add([playlist]))
}

export function* remove({ item }) {
  if (item.local) { // is local
    yield put(actions.playlists.remove(item))
    const playlistsIds = {}
    playlistsIds[item.id] = 1
    yield call(deletePlaylistItems, playlistsIds)
    return
  }

  const isConnected = yield call(netInfoIsConnected)
  if (isConnected) {
    try {
      const user = yield select(selectors.getUser)
      const url = `${Endpoints.deletePlaylists}?userId=${user.userId}&sessionToken=${user.sessionToken}&id[]=${item.id}`
      const response = yield call(api.deletePlaylists, url)
      if (response && response.result.code === 200) {
        yield put(actions.playlists.remove(item))
        const playlistsIds = {}
        playlistsIds[item.id] = 1
        yield call(deletePlaylistItems, playlistsIds)
      } else {
        yield call(markAsRemoved, item.id)
      }
    } catch (e) {
      yield call(markAsRemoved, item.id)
    }
  } else {
    yield call(markAsRemoved, item.id)
  }
}

export function* markAsRemoved(id) {
  let all = yield select(selectors.getAllPlaylists)
  all = all.map(el => {
    if (el.id !== id) {
      return el
    } else {
      return {
        ...el,
        deleted: 1
      }
    }
  })
  yield put(actions.playlists.set(all))
  const playlistsIds = {}
  playlistsIds[id] = 1
  yield call(deletePlaylistItems, playlistsIds)
}
