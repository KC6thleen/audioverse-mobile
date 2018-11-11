import { call, put, select } from 'redux-saga/effects'
import TrackPlayer from 'react-native-track-player'

import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'
import * as api from './api'
import * as player from './player'
import { parseBibleChapter } from 'src/services'

/**
 * Set Bible version
 * @param {object} version
 */
export function* setBibleVersion({ version }) {
  yield put(actions.bibleVersion(version))
  const bible = yield select(selectors.getBible)
  // refresh chapters
  yield call(api.loadBibleChapters, { loadMore: false, refresh: false, testament: bible.testament, book: bible.book })
  let chapters = yield select(selectors.getBibleChapters)

  const tracks = chapters.map(item => parseBibleChapter(item, bible))
  const id = yield call(TrackPlayer.getCurrentTrack)
  if (id) {
    const currentTrack = yield call(TrackPlayer.getTrack, id)
    const track = tracks.find(el => el.chapter === currentTrack.chapter)
    yield call(player.resetAndPlayTrack, { tracks, id: track.id })
  }
}
