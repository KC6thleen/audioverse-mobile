import { put, select, call } from 'redux-saga/effects'
import firebase from 'react-native-firebase'

import { Endpoints, ContentTypes } from 'src/constants'
import * as api from 'src/services'
import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'
import { netInfoIsConnected } from 'src/utils'

function* syncLocalToServer(user) {
  const local = yield select(selectors.getLocalFavorites)

  if (local.length) {
    const fd = local.reduce((acc, cur) => {
      acc.append('catalogId[]', cur.id)
      return acc
    }, new FormData())

    fd.append('catalog', 'recording')
    fd.append('userId', user.userId)
    fd.append('sessionToken', user.sessionToken)

    yield call(api.postFavorites, Endpoints.postFavorites, fd)
  }
}

function* syncDeletedToServer(user) {
  const deleted = yield select(selectors.getDeletedFavorites)

  if (deleted.length) {
    const ids = deleted.reduce((acc, cur) => (
      `${acc}&id[]=${cur.favoriteId}`
    ), '')

    const url = `${Endpoints.deleteFavorites}?userId=${user.userId}&sessionToken=${user.sessionToken}${ids}&clearAll=0`
    yield call(api.deleteFavorites, url)
  }
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
      const url = `${Endpoints.favorites}?userId=${user.userId}&sessionToken=${user.sessionToken}`
      const response = yield call(api.fetchFavorites, url)
      // add to the store
      if (response && response.result) {
        yield put(actions.favorites.set(response.result))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export function* add({ item }) {
  const isConnected = yield call(netInfoIsConnected)
  if (isConnected) {
    try {
      const user = yield select(selectors.getUser)

      const fd = new FormData()
      fd.append('catalogId', item.id)
      fd.append('catalog', 'recording')
      fd.append('userId', user.userId)
      fd.append('sessionToken', user.sessionToken)

      const response = yield call(api.postFavorites, Endpoints.postFavorites, fd)
      if (response && response.result.result.favoriteId) {
        yield put(actions.favorites.add([{
          ...item,
          favoriteId: response.result.result.favoriteId
        }]))
      } else {
        yield put(actions.favorites.add([item]))
      }
    } catch (e) {
      yield put(actions.favorites.add([item]))
    }
  } else {
    yield put(actions.favorites.add([item]))
  }
  // analytics
  firebase.analytics().logEvent('favorite', {
    content_type: Object.keys(ContentTypes).find(key => ContentTypes[key] === item.contentType),
    item_id: item.id,
    title: item.title,
  })
}

export function* remove({ id }) {
  const item = yield select(selectors.getFavorite, id)
  if (!item.favoriteId) { // is local
    yield put(actions.favorites.remove(item))
    return
  }

  const isConnected = yield call(netInfoIsConnected)
  if (isConnected) {
    try {
      const user = yield select(selectors.getUser)
      const url = `${Endpoints.deleteFavorites}?userId=${user.userId}&sessionToken=${user.sessionToken}&id[]=${item.favoriteId}&clearAll=0`
      const response = yield call(api.deleteFavorites, url)
      if (response && response.result.code === 200) {
        yield put(actions.favorites.remove(item))
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
  let all = yield select(selectors.getAllFavorites)
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
  yield put(actions.favorites.set(all))
}
