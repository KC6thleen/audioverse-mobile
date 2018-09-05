import { all, takeLatest } from 'redux-saga/effects'

import * as actions from 'src/actions'
import { startup } from './startup'
import { changeLanguage } from './settings'
import * as player from './player'
import * as api from './api'

function* rootSaga() {
  yield all([
    startup(),
    takeLatest(actions.CHANGE_LANGUAGE, changeLanguage),
    takeLatest(actions.SETUP_PLAYER, player.setupPlayer),
    takeLatest(actions.PLAYBACK_UPDATE, player.playbackUpdate),
    takeLatest(actions.RESET_AND_PLAY_TRACK, player.resetAndPlayTrack),
    takeLatest(actions.PLAY_PAUSE, player.playPause),
    takeLatest(actions.SKIP_TO_PREVIOUS, player.skipToPrevious),
    takeLatest(actions.SKIP_TO_NEXT, player.skipToNext),
    takeLatest(actions.REPLAY, player.replay),
    takeLatest(actions.FORWARD, player.forward),
    takeLatest(actions.SET_RATE, player.setRate),
    takeLatest(actions.LOAD_BIBLE_BOOKS, api.loadBibleBooks),
    takeLatest(actions.LOAD_BIBLE_CHAPTERS, api.loadBibleChapters),
    takeLatest(actions.LOAD_NEW_RECORDINGS, api.loadNewRecordings),
    takeLatest(actions.LOAD_TRENDING_RECORDINGS, api.loadTrendingRecordings),
    takeLatest(actions.LOAD_FEATURED_RECORDINGS, api.loadFeaturedRecordings),
    takeLatest(actions.LOAD_BOOKS, api.loadBooks),
    takeLatest(actions.LOAD_BOOK, api.loadBook),
    takeLatest(actions.LOAD_STORIES, api.loadStories),
    takeLatest(actions.LOAD_STORY, api.loadStory),
    takeLatest(actions.LOAD_PRESENTERS, api.loadPresenters),
    takeLatest(actions.LOAD_PRESENTER, api.loadPresenter),
    takeLatest(actions.LOAD_CONFERENCES, api.loadConferences),
    takeLatest(actions.LOAD_CONFERENCE, api.loadConference),
    takeLatest(actions.LOAD_SPONSORS, api.loadSponsors),
    takeLatest(actions.LOAD_SPONSOR, api.loadSponsor),
    takeLatest(actions.LOAD_SERIES, api.loadSeries),
    takeLatest(actions.LOAD_SERIE, api.loadSerie),
    takeLatest(actions.LOAD_TOPICS, api.loadTopics),
    takeLatest(actions.LOAD_TOPIC, api.loadTopic)
  ])
}

export default rootSaga
