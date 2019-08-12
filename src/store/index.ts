import { combineReducers } from 'redux'
import { createMigrate, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Track } from 'react-native-track-player'

import * as ActionTypes from '../actions'
import paginate from './paginate'
import { ContentTypes } from '../constants'

import { settingsReducer as settings } from './settings/reducers'
import { playbackReducer as playback } from './playback/reducers'
import { BibleReducer as bible } from './Bible/reducers'
import { userReducer as user } from './user/reducers'
import { localFilesReducer as localFiles } from './localFiles/reducers'
import { listsReducer as lists } from './lists/reducers'
import { downloadsQueueReducer as downloadsQueue } from './downloadsQueue/reducers'

const rootReducer = combineReducers({
  settings,
  playback,
  bible,
  user,
  localFiles,
  lists,
  downloadsQueue,
  bibleBooks: paginate({
    types: [
      ActionTypes.BIBLE_BOOKS.REQUEST,
      ActionTypes.BIBLE_BOOKS.SUCCESS,
      ActionTypes.BIBLE_BOOKS.REFRESH,
      ActionTypes.BIBLE_BOOKS.FAILURE
    ]
  }),
  bibleChapters: paginate({
    types: [
      ActionTypes.BIBLE_CHAPTERS.REQUEST,
      ActionTypes.BIBLE_CHAPTERS.SUCCESS,
      ActionTypes.BIBLE_CHAPTERS.REFRESH,
      ActionTypes.BIBLE_CHAPTERS.FAILURE
    ]
  }),
  newRecordings: paginate({
    types: [
      ActionTypes.NEW_RECORDINGS.REQUEST,
      ActionTypes.NEW_RECORDINGS.SUCCESS,
      ActionTypes.NEW_RECORDINGS.REFRESH,
      ActionTypes.NEW_RECORDINGS.FAILURE
    ]
  }),
  trendingRecordings: paginate({
    types: [
      ActionTypes.TRENDING_RECORDINGS.REQUEST,
      ActionTypes.TRENDING_RECORDINGS.SUCCESS,
      ActionTypes.TRENDING_RECORDINGS.REFRESH,
      ActionTypes.TRENDING_RECORDINGS.FAILURE
    ]
  }),
  featuredRecordings: paginate({
    types: [
      ActionTypes.FEATURED_RECORDINGS.REQUEST,
      ActionTypes.FEATURED_RECORDINGS.SUCCESS,
      ActionTypes.FEATURED_RECORDINGS.REFRESH,
      ActionTypes.FEATURED_RECORDINGS.FAILURE
    ]
  }),
  books: paginate({
    types: [
      ActionTypes.BOOKS.REQUEST,
      ActionTypes.BOOKS.SUCCESS,
      ActionTypes.BOOKS.REFRESH,
      ActionTypes.BOOKS.FAILURE
    ]
  }),
  book: paginate({
    types: [
      ActionTypes.BOOK.REQUEST,
      ActionTypes.BOOK.SUCCESS,
      ActionTypes.BOOK.REFRESH,
      ActionTypes.BOOK.FAILURE
    ]
  }),
  stories: paginate({
    types: [
      ActionTypes.STORIES.REQUEST,
      ActionTypes.STORIES.SUCCESS,
      ActionTypes.STORIES.REFRESH,
      ActionTypes.STORIES.FAILURE
    ]
  }),
  story: paginate({
    types: [
      ActionTypes.STORY.REQUEST,
      ActionTypes.STORY.SUCCESS,
      ActionTypes.STORY.REFRESH,
      ActionTypes.STORY.FAILURE
    ]
  }),
  presenters: paginate({
    types: [
      ActionTypes.PRESENTERS.REQUEST,
      ActionTypes.PRESENTERS.SUCCESS,
      ActionTypes.PRESENTERS.REFRESH,
      ActionTypes.PRESENTERS.FAILURE
    ]
  }),
  presenter: paginate({
    types: [
      ActionTypes.PRESENTER.REQUEST,
      ActionTypes.PRESENTER.SUCCESS,
      ActionTypes.PRESENTER.REFRESH,
      ActionTypes.PRESENTER.FAILURE
    ]
  }),
  conferences: paginate({
    types: [
      ActionTypes.CONFERENCES.REQUEST,
      ActionTypes.CONFERENCES.SUCCESS,
      ActionTypes.CONFERENCES.REFRESH,
      ActionTypes.CONFERENCES.FAILURE
    ]
  }),
  conference: paginate({
    types: [
      ActionTypes.CONFERENCE.REQUEST,
      ActionTypes.CONFERENCE.SUCCESS,
      ActionTypes.CONFERENCE.REFRESH,
      ActionTypes.CONFERENCE.FAILURE
    ]
  }),
  sponsors: paginate({
    types: [
      ActionTypes.SPONSORS.REQUEST,
      ActionTypes.SPONSORS.SUCCESS,
      ActionTypes.SPONSORS.REFRESH,
      ActionTypes.SPONSORS.FAILURE
    ]
  }),
  sponsor: paginate({
    types: [
      ActionTypes.SPONSOR.REQUEST,
      ActionTypes.SPONSOR.SUCCESS,
      ActionTypes.SPONSOR.REFRESH,
      ActionTypes.SPONSOR.FAILURE
    ]
  }),
  series: paginate({
    types: [
      ActionTypes.SERIES.REQUEST,
      ActionTypes.SERIES.SUCCESS,
      ActionTypes.SERIES.REFRESH,
      ActionTypes.SERIES.FAILURE
    ]
  }),
  serie: paginate({
    types: [
      ActionTypes.SERIE.REQUEST,
      ActionTypes.SERIE.SUCCESS,
      ActionTypes.SERIE.REFRESH,
      ActionTypes.SERIE.FAILURE
    ]
  }),
  topics: paginate({
    types: [
      ActionTypes.TOPICS.REQUEST,
      ActionTypes.TOPICS.SUCCESS,
      ActionTypes.TOPICS.REFRESH,
      ActionTypes.TOPICS.FAILURE
    ]
  }),
  topic: paginate({
    types: [
      ActionTypes.TOPIC.REQUEST,
      ActionTypes.TOPIC.SUCCESS,
      ActionTypes.TOPIC.REFRESH,
      ActionTypes.TOPIC.FAILURE
    ]
  }),
  tagsBooks: paginate({
    types: [
      ActionTypes.TAGS_BOOKS.REQUEST,
      ActionTypes.TAGS_BOOKS.SUCCESS,
      ActionTypes.TAGS_BOOKS.REFRESH,
      ActionTypes.TAGS_BOOKS.FAILURE
    ]
  }),
  tagBook: paginate({
    types: [
      ActionTypes.TAG_BOOK.REQUEST,
      ActionTypes.TAG_BOOK.SUCCESS,
      ActionTypes.TAG_BOOK.REFRESH,
      ActionTypes.TAG_BOOK.FAILURE
    ]
  }),
  tagsAlbums: paginate({
    types: [
      ActionTypes.TAGS_ALBUMS.REQUEST,
      ActionTypes.TAGS_ALBUMS.SUCCESS,
      ActionTypes.TAGS_ALBUMS.REFRESH,
      ActionTypes.TAGS_ALBUMS.FAILURE
    ]
  }),
  tagAlbum: paginate({
    types: [
      ActionTypes.TAG_ALBUM.REQUEST,
      ActionTypes.TAG_ALBUM.SUCCESS,
      ActionTypes.TAG_ALBUM.REFRESH,
      ActionTypes.TAG_ALBUM.FAILURE
    ]
  }),
  tagsSponsors: paginate({
    types: [
      ActionTypes.TAGS_SPONSORS.REQUEST,
      ActionTypes.TAGS_SPONSORS.SUCCESS,
      ActionTypes.TAGS_SPONSORS.REFRESH,
      ActionTypes.TAGS_SPONSORS.FAILURE
    ]
  }),
  tagSponsor: paginate({
    types: [
      ActionTypes.TAG_SPONSOR.REQUEST,
      ActionTypes.TAG_SPONSOR.SUCCESS,
      ActionTypes.TAG_SPONSOR.REFRESH,
      ActionTypes.TAG_SPONSOR.FAILURE
    ]
  }),
  tags: paginate({
    types: [
      ActionTypes.TAGS.REQUEST,
      ActionTypes.TAGS.SUCCESS,
      ActionTypes.TAGS.REFRESH,
      ActionTypes.TAGS.FAILURE
    ]
  }),
  tag: paginate({
    types: [
      ActionTypes.TAG.REQUEST,
      ActionTypes.TAG.SUCCESS,
      ActionTypes.TAG.REFRESH,
      ActionTypes.TAG.FAILURE
    ]
  })
})

export type AppState = ReturnType<typeof rootReducer>

const migrations: any = {
  1: (state: {[key: string]: any}) => {
    // migration to add contentType since it was not coming on the API before
    const lists = Object.keys(state.lists).reduce((acc, curr) => {
      if (state.lists[curr] === 'playlists') {
        acc[curr] = state.lists[curr]
      } else {
        acc[curr] = state.lists[curr].map((el: {}) => ({
          ...el,
          contentType: ContentTypes.sermon,
        }))
      }
      return acc
    }, {} as {[key: string]: any})

    return {
      ...state,
      playback: {
        ...state.playback,
        tracks: state.playback.tracks.map((el: Track) => ({
          ...el,
          contentType: ContentTypes[el.mediaType],
        })),
      },
      lists: lists,
    }
  },
  2: (state: {[key: string]: any}) => { // change the default bitRate
    return {
      ...state,
      settings: {
        ...state.settings,
        bitRate: "48",
      }
    }
  }
}

// persist reducer
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings', 'playback', 'bible', 'user', 'lists', 'presenters'],
  timeout: 0, // disable timeout https://github.com/rt2zz/redux-persist/issues/717
  version: 2,
  migrate: createMigrate(migrations, { debug: false }),
}

export default persistReducer(persistConfig, rootReducer)
