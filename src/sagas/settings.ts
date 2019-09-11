import AsyncStorage from '@react-native-community/async-storage'
import { all, put, call } from 'redux-saga/effects'

import I18n from '../../locales'
import * as actions from '../actions'
import { setUser } from '../store/user/actions'
import { ChangeLanguageAction } from '../store/settings/types'
import {
  setFavorites,
  setPlaylists,
  setPlaylistsItems,
} from '../store/lists/actions'

/**
 * Changes app language
 * @param {object} action 
 */
export function* changeLanguage({ language }: ChangeLanguageAction) {
  if (I18n.locale !== language) {
    I18n.locale = language
    yield all([
      put(actions.newRecordings.refresh(null, {result: []})),
      put(actions.trendingRecordings.refresh(null, {result: []})),
      put(actions.featuredRecordings.refresh(null, {result: []})),
      put(actions.books.refresh(null, {result: []})),
      put(actions.stories.refresh(null, {result: []})),
      put(actions.presenters.refresh(null, {result: []})),
      put(actions.conferences.refresh(null, {result: []})),
      put(actions.sponsors.refresh(null, {result: []})),
      put(actions.series.refresh(null, {result: []})),
      put(actions.topics.refresh(null, {result: []}))
    ])
  }
}

/**
 * Log out 
 */
export function* logOut() {
  yield put(setFavorites([]))
  yield put(setPlaylists([]))
  yield put(setPlaylistsItems([]))
  yield put(setUser(null))
  yield call(AsyncStorage.removeItem, 'hideLogin')
}
