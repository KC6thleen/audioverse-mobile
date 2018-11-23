import { all, takeLatest } from 'redux-saga/effects'

import * as actions from 'src/actions'
import recoverDB from './db'
import { startup } from './startup'
import * as settings from './settings'
import * as player from './player'
import * as api from './api'
import * as downloads from './downloads'
import * as favorites from './favorites'
import * as playlists from './playlists'
import * as playlistItems from './playlistItems'
import * as bible from './bible'

function* rootSaga() {
  yield all([
    startup(),
    recoverDB(),
    takeLatest(actions.CHANGE_LANGUAGE, settings.changeLanguage),
    takeLatest(actions.LOG_OUT, settings.logOut),
    takeLatest(actions.RESET_AND_PLAY_TRACK, player.resetAndPlayTrack),
    takeLatest(actions.PLAY_PAUSE, player.playPause),
    takeLatest(actions.SKIP_TO_PREVIOUS, player.skipToPrevious),
    takeLatest(actions.SKIP_TO_NEXT, player.skipToNext),
    takeLatest(actions.REPLAY, player.replay),
    takeLatest(actions.FORWARD, player.forward),
    takeLatest(actions.SET_RATE, player.setRate),
    takeLatest(actions.TRACK_INITIALIZED, player.trackInitialized),
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
    takeLatest(actions.LOAD_TOPIC, api.loadTopic),
    takeLatest(actions.LOAD_TAGS_BOOKS, api.loadTagsBooks),
    takeLatest(actions.LOAD_TAG_BOOK, api.loadTagBook),
    takeLatest(actions.LOAD_TAGS_ALBUMS, api.loadTagsAlbums),
    takeLatest(actions.LOAD_TAG_ALBUM, api.loadTagAlbum),
    takeLatest(actions.LOAD_TAGS_SPONSORS, api.loadTagsSponsors),
    takeLatest(actions.LOAD_TAG_SPONSOR, api.loadTagSponsor),
    takeLatest(actions.LOAD_TAGS, api.loadTags),
    takeLatest(actions.LOAD_TAG, api.loadTag),
    takeLatest(actions.DOWNLOAD, downloads.download),
    takeLatest(actions.REMOVE_DOWNLOAD, downloads.remove),
    takeLatest(actions.SYNC_FAVORITES, favorites.sync),
    takeLatest(actions.ADD_FAVORITE, favorites.add),
    takeLatest(actions.REMOVE_FAVORITE, favorites.remove),
    takeLatest(actions.SYNC_PLAYLISTS, playlists.sync),
    takeLatest(actions.ADD_PLAYLIST, playlists.add),
    takeLatest(actions.REMOVE_PLAYLIST, playlists.remove),
    takeLatest(actions.SYNC_PLAYLIST_ITEMS, playlistItems.sync),
    takeLatest(actions.ADD_PLAYLIST_ITEM, playlistItems.add),
    takeLatest(actions.REMOVE_PLAYLIST_ITEM, playlistItems.remove),
    takeLatest(actions.PLAY_VIDEO, player.playVideo),
    takeLatest(actions.SET_BIBLE_VERSION, bible.setBibleVersion)
  ])
}

export default rootSaga
