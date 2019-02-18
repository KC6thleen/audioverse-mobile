import { combineReducers } from 'redux'
import { createMigrate, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import I18n from 'locales'
import * as ActionTypes from 'src/actions'
import paginate from './paginate'
import { ContentTypes } from 'src/constants'

function settings(state = {
  language: I18n.locale.substr(0,2),
  bitRate: "16",
  autoPlay: false
}, action) {
  switch(action.type) {
    case ActionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      }
    case ActionTypes.AUTOPLAY:
      return {
        ...state,
        autoPlay: action.autoPlay
      }
    default:
      return state
  }
}

function playerState(state = null, action) {
  switch(action.type) {
    case ActionTypes.PLAYER_STATE:
      return action.state
    default:
      return state
  }
}

function playback(state = {
  init: false,
  currentTrackId: null,
  tracks: [],
  rate: 1,
  position: 0
}, action) {
  switch(action.type) {
    case ActionTypes.PLAYBACK_INIT:
      return {
        ...state,
        init: true
      }
    case ActionTypes.PLAYBACK_TRACK_ID:
      return {
        ...state,
        currentTrackId: action.trackId
      }
    case ActionTypes.PLAYBACK_TRACKS:
      return {
        ...state,
        tracks: action.tracks
      }
    case ActionTypes.PLAYBACK_RATE:
      return {
        ...state,
        rate: action.rate
      }
    case ActionTypes.PLAYBACK_POSITION:
      return {
        ...state,
        position: action.position
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
  book: {
    dam_id: 'ENGESV2',
    name: 'Genesis',
    book_id: 'Gen',
    chapters: '50',
    testament: 'O',
    drama: 2
  },
  chapter: 1,
  verses: ''
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
        book: action.book
      }
    case ActionTypes.BIBLE_CHAPTER:
      return {
        ...state,
        chapter: action.chapter
      }
    case ActionTypes.BIBLE_VERSES:
      return {
        ...state,
        verses: action.verses
      }
    default:
      return state
  }
}

function user(state = null, action) {
  switch(action.type) {
    case ActionTypes.USER:
      return action.user
    default:
      return state
  }
}

function localFiles(state = [], action) {
  switch(action.type) {
    case ActionTypes.ADD_LOCAL_FILES:
      return [
        ...action.items,
        ...state
      ]
    case ActionTypes.REMOVE_LOCAL_FILES:
      return state.filter(el => el !== action.item)
    default:
      return state
  }
}

function myLists(types, filterCB) {
  const [ SET, ADD, REMOVE ] = types
  return function update(state = [], action) {
    switch(action.type) {
      case SET:
        return action.items
      case ADD:
        return [
          ...action.items,
          ...state
        ]
      case REMOVE:
        return state.filter(filterCB(action.item))
      default:
        return state
    }
  }
}

const downloads = myLists(
  [
    ActionTypes.DOWNLOADS.SET,
    ActionTypes.DOWNLOADS.ADD,
    ActionTypes.DOWNLOADS.REMOVE
  ],
  item => el => !(el.id === item.id && el.bitRate === item.bitRate)
)

const favorites = myLists(
  [
    ActionTypes.FAVORITES.SET,
    ActionTypes.FAVORITES.ADD,
    ActionTypes.FAVORITES.REMOVE
  ],
  item => el => el.id !== item.id
)

const playlists = myLists(
  [
    ActionTypes.PLAYLISTS.SET,
    ActionTypes.PLAYLISTS.ADD,
    ActionTypes.PLAYLISTS.REMOVE
  ],
  item => el => el.id !== item.id
)

const playlistsItems = myLists(
  [
    ActionTypes.PLAYLIST_ITEMS.SET,
    ActionTypes.PLAYLIST_ITEMS.ADD,
    ActionTypes.PLAYLIST_ITEMS.REMOVE
  ],
  item => el => !(el.id === item.id && el.playlistId === item.playlistId)
)

const history = myLists(
  [
    ActionTypes.HISTORY.SET,
    ActionTypes.HISTORY.ADD,
    ActionTypes.HISTORY.REMOVE
  ],
  item => el => el.id !== item.id
)

function downloadsQueue(state = { downloading: false, progress: 0, queue: [] }, action) {
  switch(action.type) {
    case ActionTypes.ADD_TO_DOWNLOADS_QUEUE:
      if (!state.queue.some(el => el.id == action.item.id)) {
        return {
          ...state,
          queue: [
            ...state.queue,
            action.item
          ]
        }
      }
      return state
    case ActionTypes.REMOVE_FROM_DOWNLOADS_QUEUE:
      return {
        ...state,
        queue: state.queue.filter( el => el.id != action.item.id )
      }
    case ActionTypes.DOWNLOAD_PROGRESS:
      return {
        ...state,
        queue: state.queue.map( el => {
          if (el.data.id == action.item.id) {
            el.data.progress = action.progress
          }
          return el
        })
      }
    case ActionTypes.SET_DOWNLOADING:
      return {
        ...state,
        downloading: action.downloading
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  settings,
  playerState,
  playback,
  bible,
  user,
  localFiles,
  lists: combineReducers({
    downloads,
    favorites,
    playlists,
    playlistsItems,
    history
  }),
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

const migrations = {
  1: (state) => {
    // migration to add contentType since it was not coming on the API before
    const lists = Object.keys(state.lists).reduce((acc, curr) => {
      if (state.lists[curr] === 'playlists') {
        acc[curr] = state.lists[curr]
      } else {
        acc[curr] = state.lists[curr].map(el => ({
          ...el,
          contentType: ContentTypes.sermon,
        }))
      }
      return acc
    }, {})

    return {
      ...state,
      playback: {
        ...state.playback,
        tracks: state.playback.tracks.map(el => ({
          ...el,
          contentType: ContentTypes[el.mediaType],
        })),
      },
      lists: lists,
    }
  }
}

// persist reducer
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings', 'playback', 'bible', 'user', 'lists', 'presenters'],
  timeout: 0, // disable timeout https://github.com/rt2zz/redux-persist/issues/717
  version: 1,
  migrate: createMigrate(migrations, { debug: false }),
}

export default persistReducer(persistConfig, rootReducer)
