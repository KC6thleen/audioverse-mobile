import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import I18n from 'locales'
import * as ActionTypes from 'src/actions'
import paginate from './paginate'
// use this to use react-navigation with redux
// import AppNavigator from 'src/navigators/AppNavigator'
// function nav(state, action) {
//   const nextState = AppNavigator.router.getStateForAction(action, state)
//   return nextState || state
// }

function language(state = I18n.locale.substr(0,2), action) {
  switch(action.type) {
    case ActionTypes.CHANGE_LANGUAGE:
      return action.language
    default:
      return state
  }
}

function playback(state = { rate: 1 }, action) {
  switch(action.type) {
    case ActionTypes.PLAYBACK_INIT:
      return {
        ...state,
        init: true
      }
    case ActionTypes.PLAYBACK_STATE:
      return {
        ...state,
        state: action.state
      }
    case ActionTypes.PLAYBACK_TRACK_ID:
      return {
        ...state,
        currentTrackId: action.trackId
      }
    case ActionTypes.PLAYBACK_TRACK:
      return {
        ...state,
        currentTrack: action.track
      }
    case ActionTypes.PLAYBACK_RATE:
      return {
        ...state,
        rate: action.rate
      }
    default:
      return state
  }
}

function bible(state = {
  version: {
    id: 'ENGESV2',
    name: '2001 English Standard',
    abbr: 'ESV'
  },
  testament: 'O',
  book: 'Gen',
  chapter: 1
}, action) {
  switch(action.type) {
    case ActionTypes.BIBLE_VERSION:
      return {
        ...state,
        version: action.version
      }
    case ActionTypes.BIBLE_BOOK:
      return {
        ...state,
        testament: action.testament,
        book: action.book
      }
    case ActionTypes.BIBLE_CHAPTER:
      return {
        ...state,
        chapter: action.chapter
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  // nav, // use this to use react-navigation with redux
  language,
  playback,
  bible,
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
  })
})

// persist reducer
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language'],
  debug: true
}

export default persistReducer(persistConfig, rootReducer)
