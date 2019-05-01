import { call, put, select } from 'redux-saga/effects'
import TrackPlayer from 'react-native-track-player'

import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'
import * as api from './api'
import * as player from './player'

/**
 * Set Bible version
 * @param {object} version
 */
export function* setBibleVersion({ version, bookId }) {
  yield put(actions.bibleVersion(version))
  const bible = yield select(selectors.getBible)
  // refresh books
  yield call(api.loadBibleBooks, { loadMore: false, refresh: false })

  if (bookId) {
    const books = yield select(selectors.getBibleBooks)
    const book = books.find(el => el.book_id === bookId)
    if (book) {
      // refresh chapters
      yield call(api.loadBibleChapters, { loadMore: false, refresh: false, book: book })
    }
  } else {
    // refresh chapters
    yield call(api.loadBibleChapters, { loadMore: false, refresh: false, book: bible.book })
    const id = yield call(TrackPlayer.getCurrentTrack)
    if (id) {
      const tracks = yield select(selectors.getBibleChapters)
      const currentTrack = yield call(TrackPlayer.getTrack, id)
      const track = tracks.find(el => el.chapter === currentTrack.chapter)
      yield call(player.resetAndPlayTrack, { tracks, id: track.id })
    }
  }
}
