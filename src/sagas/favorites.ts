import { put, select, call } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import { Track } from 'react-native-track-player'

import { Endpoints, ContentTypes } from '../constants'
import * as api from '../services'
import { setFavorites, addFavorites, removeFavorites } from '../store/lists/actions'
import * as selectors from '../reducers/selectors'
import { netInfoIsConnected } from '../utils'
import { UserState } from '../store/user/types'

function* syncLocalToServer(user: UserState) {
  const local: Track[] = yield select(selectors.getLocalFavorites)

  if (local.length) {
    const fd = local.reduce((acc, cur) => {
      acc.append('catalogId[]', cur.id)
      return acc
    }, new FormData())

    fd.append('catalog', 'recording')
    fd.append('userId', user!.userId)
    fd.append('sessionToken', user!.sessionToken)

    yield call(api.postFavorites, Endpoints.postFavorites, fd)
  }
}

function* syncDeletedToServer(user: UserState) {
  const deleted: Track[] = yield select(selectors.getDeletedFavorites)

  if (deleted.length) {
    const ids = deleted.reduce((acc, cur) => (
      `${acc}&id[]=${cur.favoriteId}`
    ), '')

    const url = `${Endpoints.deleteFavorites}?userId=${user!.userId}&sessionToken=${user!.sessionToken}${ids}&clearAll=0`
    yield call(api.deleteFavorites, url)
  }
}

export function* sync() {
  const isConnected = yield call(netInfoIsConnected)
  const user: UserState = yield select(selectors.getUser)
  console.log('isConnected', isConnected)
  if (isConnected && user) {
    try {
      // sync local to server
      yield call(syncLocalToServer, user)
      // sync deleted to server
      yield call(syncDeletedToServer, user)
      // fetch all
      const url = `${Endpoints.favorites}?userId=${user.userId}&sessionToken=${user.sessionToken}`
      const response = yield call(api.fetchFavorites, url)
      // add to the store
      if (response && response.result) {
        yield put(setFavorites(response.result))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export function* add({ item }: { type: string, item: Track }) {
  const isConnected = yield call(netInfoIsConnected)
  if (isConnected) {
    try {
      const user: UserState = yield select(selectors.getUser)

      const fd = new FormData()
      fd.append('catalogId', item.id)
      fd.append('catalog', 'recording')
      fd.append('userId', user!.userId)
      fd.append('sessionToken', user!.sessionToken)

      const response = yield call(api.postFavorites, Endpoints.postFavorites, fd)
      if (response && response.result.result.favoriteId) {
        yield put(addFavorites([{
          ...item,
          favoriteId: response.result.result.favoriteId
        }]))
      } else {
        yield put(addFavorites([item]))
      }
    } catch (e) {
      yield put(addFavorites([item]))
    }
  } else {
    yield put(addFavorites([item]))
  }
  // analytics
  firebase.analytics().logEvent('favorite', {
    content_type: Object.keys(ContentTypes).find(key => ContentTypes[key] === item.contentType),
    item_id: item.id,
    title: item.title,
  })
}

export function* remove({ id }: { type: string, id: string }) {
  const item = yield select(selectors.getFavorite, id)
  if (!item.favoriteId) { // is local
    yield put(removeFavorites(item))
    return
  }

  const isConnected = yield call(netInfoIsConnected)
  if (isConnected) {
    try {
      const user: UserState = yield select(selectors.getUser)
      const url = `${Endpoints.deleteFavorites}?userId=${user!.userId}&sessionToken=${user!.sessionToken}&id[]=${item.favoriteId}&clearAll=0`
      const response = yield call(api.deleteFavorites, url)
      if (response && response.result.code === 200) {
        yield put(removeFavorites(item))
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

export function* markAsRemoved(id: string) {
  let all = yield select(selectors.getAllFavorites)
  all = all.map((el: Track) => {
    if (el.id !== id) {
      return el
    } else {
      return {
        ...el,
        deleted: 1
      }
    }
  })
  yield put(setFavorites(all))
}
