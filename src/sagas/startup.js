import { select, call } from 'redux-saga/effects'
import firebase from 'react-native-firebase'

import * as selectors from 'src/reducers/selectors'
import I18n from 'locales'
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
  yield call(recoverDB)
}
