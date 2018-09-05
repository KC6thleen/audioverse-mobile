import { select, put } from 'redux-saga/effects'

import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'

/**
 * Process startup actions
 * @param {object} action 
 */
export function* startup(action) {
  const language = yield select(selectors.getLanguage)
  console.log('starup....', language)
  yield put(actions.changeLanguage(language))
}
