import { select, call } from 'redux-saga/effects'
import TrackPlayer from 'react-native-track-player'
import firebase from 'react-native-firebase'

import * as selectors from 'src/reducers/selectors'
import I18n from 'locales'
import { playerOptions } from './player'
import recoverDB from './db'

/**
 * Process startup actions
 * @param {object} action 
 */
export function* startup(action) {
  const language = yield select(selectors.getLanguage)
  if (I18n.locale !== language) {
    I18n.locale = language
  }
  const user = yield select(selectors.getUser)
  if (user) {
    firebase.analytics().setUserId(user.userId ? user.userId.toString() : null)
  }
  console.log('startup', I18n.locale, language, user)
  const state = yield call(TrackPlayer.getState)	
  if (state === TrackPlayer.STATE_NONE) {
    yield call(TrackPlayer.setupPlayer)
    yield call(TrackPlayer.updateOptions, playerOptions)
  }
  yield call(recoverDB)
}
