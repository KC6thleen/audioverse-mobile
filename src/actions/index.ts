// TODO split this file into separate modules
import { Track } from 'react-native-track-player'

function action(type: string, payload: {[key: string]: any} = {}): {type: string, [key: string]: any} {
  return {
    ...payload,
    type,
  }
}

export const STARTUP = 'STARTUP'

export const RESET_AND_PLAY_TRACK = 'RESET_AND_PLAY_TRACK'
export const PLAY_PAUSE = 'PLAY_PAUSE'
export const SET_BITRATE_AND_RESET = 'SET_BITRATE_AND_RESET'

export const SKIP_TO_PREVIOUS = 'SKIP_TO_PREVIOUS'
export const SKIP_TO_NEXT = 'SKIP_TO_NEXT'
export const REPLAY = 'REPLAY'
export const FORWARD = 'FORWARD'
export const DOWNLOAD = 'DOWNLOAD'
export const SET_RATE = 'SET_RATE'
export const TRACK_INITIALIZED = 'TRACK_INITIALIZED'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const REFRESH = 'REFRESH'
const FAILURE = 'FAILURE'

function createRequestTypes(base: string) {
  return [REQUEST,  SUCCESS, REFRESH, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {} as {[key: string]: string})
}

export const BIBLE_BOOKS = createRequestTypes('BIBLE_BOOKS')
export const BIBLE_CHAPTERS = createRequestTypes('BIBLE_CHAPTERS')
export const NEW_RECORDINGS = createRequestTypes('NEW_RECORDINGS')
export const TRENDING_RECORDINGS = createRequestTypes('TRENDING_RECORDINGS')
export const FEATURED_RECORDINGS = createRequestTypes('FEATURED_RECORDINGS')
export const BOOKS = createRequestTypes('BOOKS')
export const BOOK = createRequestTypes('BOOK')
export const STORIES = createRequestTypes('STORIES')
export const STORY = createRequestTypes('STORY')
export const PRESENTERS = createRequestTypes('PRESENTERS')
export const PRESENTER = createRequestTypes('PRESENTER')
export const CONFERENCES = createRequestTypes('CONFERENCES')
export const CONFERENCE = createRequestTypes('CONFERENCE')
export const SPONSORS = createRequestTypes('SPONSORS')
export const SPONSOR = createRequestTypes('SPONSOR')
export const SERIES = createRequestTypes('SERIES')
export const SERIE = createRequestTypes('SERIE')
export const TOPICS = createRequestTypes('TOPICS')
export const TOPIC = createRequestTypes('TOPIC')
export const TAGS_BOOKS = createRequestTypes('TAGS_BOOKS')
export const TAG_BOOK = createRequestTypes('TAG_BOOK')
export const TAGS_ALBUMS = createRequestTypes('TAGS_ALBUMS')
export const TAG_ALBUM = createRequestTypes('TAG_ALBUM')
export const TAGS_SPONSORS = createRequestTypes('TAGS_SPONSORS')
export const TAG_SPONSOR = createRequestTypes('TAG_SPONSOR')
export const TAGS = createRequestTypes('TAGS')
export const TAG = createRequestTypes('TAG')

export const LOAD_BIBLE_BOOKS = 'LOAD_BIBLE_BOOKS'
export const LOAD_BIBLE_CHAPTERS = 'LOAD_BIBLE_CHAPTERS'
export const LOAD_BIBLE_VERSES = 'LOAD_BIBLE_VERSES'
export const LOAD_NEW_RECORDINGS = 'LOAD_NEW_RECORDINGS'
export const LOAD_TRENDING_RECORDINGS = 'LOAD_TRENDING_RECORDINGS'
export const LOAD_FEATURED_RECORDINGS = 'LOAD_FEATURED_RECORDINGS'
export const LOAD_BOOKS = 'LOAD_BOOKS'
export const LOAD_BOOK = 'LOAD_BOOK'
export const LOAD_STORIES = 'LOAD_STORIES'
export const LOAD_STORY = 'LOAD_STORY'
export const LOAD_PRESENTERS = 'LOAD_PRESENTERS'
export const LOAD_PRESENTER = 'LOAD_PRESENTER'
export const LOAD_CONFERENCES = 'LOAD_CONFERENCES'
export const LOAD_CONFERENCE = 'LOAD_CONFERENCE'
export const LOAD_SPONSORS = 'LOAD_SPONSORS'
export const LOAD_SPONSOR = 'LOAD_SPONSOR'
export const LOAD_SERIES = 'LOAD_SERIES'
export const LOAD_SERIE = 'LOAD_SERIE'
export const LOAD_TOPICS = 'LOAD_TOPICS'
export const LOAD_TOPIC = 'LOAD_TOPIC'
export const LOAD_TAGS_BOOKS = 'LOAD_TAGS_BOOKS'
export const LOAD_TAG_BOOK = 'LOAD_TAG_BOOK'
export const LOAD_TAGS_ALBUMS = 'LOAD_TAGS_ALBUMS'
export const LOAD_TAG_ALBUM = 'LOAD_TAG_ALBUM'
export const LOAD_TAGS_SPONSORS = 'LOAD_TAGS_SPONSORS'
export const LOAD_TAG_SPONSOR = 'LOAD_TAG_SPONSOR'
export const LOAD_TAGS = 'LOAD_TAGS'
export const LOAD_TAG = 'LOAD_TAG'

export type ApiActionType = {
  request: (id: string | null) => ReturnType<typeof action>
  success: (id: string | null, response: {}) => ReturnType<typeof action>
  refresh: (id: string | null, response: {}) => ReturnType<typeof action>
  failure: (id: string | null, error: string) => ReturnType<typeof action>
}

export const bibleBooks: ApiActionType = {
  request: (id) => action(BIBLE_BOOKS.REQUEST, {id}),
  success: (id, response) => action(BIBLE_BOOKS.SUCCESS, {id, response}),
  refresh: (id, response) => action(BIBLE_BOOKS.REFRESH, {id, response}),
  failure: (id, error) => action(BIBLE_BOOKS.FAILURE, {id, error})
}

export const bibleChapters: ApiActionType = {
  request: (id) => action(BIBLE_CHAPTERS.REQUEST, {id}),
  success: (id, response) => action(BIBLE_CHAPTERS.SUCCESS, {id, response}),
  refresh: (id, response) => action(BIBLE_CHAPTERS.REFRESH, {id, response}),
  failure: (id, error) => action(BIBLE_CHAPTERS.FAILURE, {id, error})
}

export const newRecordings: ApiActionType = {
  request: (id) => action(NEW_RECORDINGS.REQUEST, {id}),
  success: (id, response) => action(NEW_RECORDINGS.SUCCESS, {id, response}),
  refresh: (id, response) => action(NEW_RECORDINGS.REFRESH, {id, response}),
  failure: (id, error) => action(NEW_RECORDINGS.FAILURE, {id, error})
}

export const trendingRecordings: ApiActionType = {
  request: (id) => action(TRENDING_RECORDINGS.REQUEST, {id}),
  success: (id, response) => action(TRENDING_RECORDINGS.SUCCESS, {id, response}),
  refresh: (id, response) => action(TRENDING_RECORDINGS.REFRESH, {id, response}),
  failure: (id, error) => action(TRENDING_RECORDINGS.FAILURE, {id, error})
}

export const featuredRecordings: ApiActionType = {
  request: (id) => action(FEATURED_RECORDINGS.REQUEST, {id}),
  success: (id, response) => action(FEATURED_RECORDINGS.SUCCESS, {id, response}),
  refresh: (id, response) => action(FEATURED_RECORDINGS.REFRESH, {id, response}),
  failure: (id, error) => action(FEATURED_RECORDINGS.FAILURE, {id, error})
}

export const books: ApiActionType = {
  request: (id) => action(BOOKS.REQUEST, {id}),
  success: (id, response) => action(BOOKS.SUCCESS, {id, response}),
  refresh: (id, response) => action(BOOKS.REFRESH, {id, response}),
  failure: (id, error) => action(BOOKS.FAILURE, {id, error})
}

export const book: ApiActionType = {
  request: (id) => action(BOOK.REQUEST, {id}),
  success: (id, response) => action(BOOK.SUCCESS, {id, response}),
  refresh: (id, response) => action(BOOK.REFRESH, {id, response}),
  failure: (id, error) => action(BOOK.FAILURE, {id, error})
}

export const stories: ApiActionType = {
  request: (id) => action(STORIES.REQUEST, {id}),
  success: (id, response) => action(STORIES.SUCCESS, {id, response}),
  refresh: (id, response) => action(STORIES.REFRESH, {id, response}),
  failure: (id, error) => action(STORIES.FAILURE, {id, error})
}

export const story: ApiActionType = {
  request: (id) => action(STORY.REQUEST, {id}),
  success: (id, response) => action(STORY.SUCCESS, {id, response}),
  refresh: (id, response) => action(STORY.REFRESH, {id, response}),
  failure: (id, error) => action(STORY.FAILURE, {id, error})
}

export const presenters: ApiActionType = {
  request: (id) => action(PRESENTERS.REQUEST, {id}),
  success: (id, response) => action(PRESENTERS.SUCCESS, {id, response}),
  refresh: (id, response) => action(PRESENTERS.REFRESH, {id, response}),
  failure: (id, error) => action(PRESENTERS.FAILURE, {id, error})
}

export const presenter: ApiActionType = {
  request: (id) => action(PRESENTER.REQUEST, {id}),
  success: (id, response) => action(PRESENTER.SUCCESS, {id, response}),
  refresh: (id, response) => action(PRESENTER.REFRESH, {id, response}),
  failure: (id, error) => action(PRESENTER.FAILURE, {id, error})
}

export const conferences: ApiActionType = {
  request: (id) => action(CONFERENCES.REQUEST, {id}),
  success: (id, response) => action(CONFERENCES.SUCCESS, {id, response}),
  refresh: (id, response) => action(CONFERENCES.REFRESH, {id, response}),
  failure: (id, error) => action(CONFERENCES.FAILURE, {id, error})
}

export const conference: ApiActionType = {
  request: (id) => action(CONFERENCE.REQUEST, {id}),
  success: (id, response) => action(CONFERENCE.SUCCESS, {id, response}),
  refresh: (id, response) => action(CONFERENCE.REFRESH, {id, response}),
  failure: (id, error) => action(CONFERENCE.FAILURE, {id, error})
}

export const sponsors: ApiActionType = {
  request: (id) => action(SPONSORS.REQUEST, {id}),
  success: (id, response) => action(SPONSORS.SUCCESS, {id, response}),
  refresh: (id, response) => action(SPONSORS.REFRESH, {id, response}),
  failure: (id, error) => action(SPONSORS.FAILURE, {id, error})
}

export const sponsor: ApiActionType = {
  request: (id) => action(SPONSOR.REQUEST, {id}),
  success: (id, response) => action(SPONSOR.SUCCESS, {id, response}),
  refresh: (id, response) => action(SPONSOR.REFRESH, {id, response}),
  failure: (id, error) => action(SPONSOR.FAILURE, {id, error})
}

export const series: ApiActionType = {
  request: (id) => action(SERIES.REQUEST, {id}),
  success: (id, response) => action(SERIES.SUCCESS, {id, response}),
  refresh: (id, response) => action(SERIES.REFRESH, {id, response}),
  failure: (id, error) => action(SERIES.FAILURE, {id, error})
}

export const serie: ApiActionType = {
  request: (id) => action(SERIE.REQUEST, {id}),
  success: (id, response) => action(SERIE.SUCCESS, {id, response}),
  refresh: (id, response) => action(SERIE.REFRESH, {id, response}),
  failure: (id, error) => action(SERIE.FAILURE, {id, error})
}

export const topics: ApiActionType = {
  request: (id) => action(TOPICS.REQUEST, {id}),
  success: (id, response) => action(TOPICS.SUCCESS, {id, response}),
  refresh: (id, response) => action(TOPICS.REFRESH, {id, response}),
  failure: (id, error) => action(TOPICS.FAILURE, {id, error})
}

export const topic: ApiActionType = {
  request: (id) => action(TOPIC.REQUEST, {id}),
  success: (id, response) => action(TOPIC.SUCCESS, {id, response}),
  refresh: (id, response) => action(TOPIC.REFRESH, {id, response}),
  failure: (id, error) => action(TOPIC.FAILURE, {id, error})
}

export const tagsBooks: ApiActionType = {
  request: (id) => action(TAGS_BOOKS.REQUEST, {id}),
  success: (id, response) => action(TAGS_BOOKS.SUCCESS, {id, response}),
  refresh: (id, response) => action(TAGS_BOOKS.REFRESH, {id, response}),
  failure: (id, error) => action(TAGS_BOOKS.FAILURE, {id, error})
}

export const tagBook: ApiActionType = {
  request: (id) => action(TAG_BOOK.REQUEST, {id}),
  success: (id, response) => action(TAG_BOOK.SUCCESS, {id, response}),
  refresh: (id, response) => action(TAG_BOOK.REFRESH, {id, response}),
  failure: (id, error) => action(TAG_BOOK.FAILURE, {id, error})
}

export const tagsAlbums: ApiActionType = {
  request: (id) => action(TAGS_ALBUMS.REQUEST, {id}),
  success: (id, response) => action(TAGS_ALBUMS.SUCCESS, {id, response}),
  refresh: (id, response) => action(TAGS_ALBUMS.REFRESH, {id, response}),
  failure: (id, error) => action(TAGS_ALBUMS.FAILURE, {id, error})
}

export const tagAlbum: ApiActionType = {
  request: (id) => action(TAG_ALBUM.REQUEST, {id}),
  success: (id, response) => action(TAG_ALBUM.SUCCESS, {id, response}),
  refresh: (id, response) => action(TAG_ALBUM.REFRESH, {id, response}),
  failure: (id, error) => action(TAG_ALBUM.FAILURE, {id, error})
}

export const tagsSponsors: ApiActionType = {
  request: (id) => action(TAGS_SPONSORS.REQUEST, {id}),
  success: (id, response) => action(TAGS_SPONSORS.SUCCESS, {id, response}),
  refresh: (id, response) => action(TAGS_SPONSORS.REFRESH, {id, response}),
  failure: (id, error) => action(TAGS_SPONSORS.FAILURE, {id, error})
}

export const tagSponsor: ApiActionType = {
  request: (id) => action(TAG_SPONSOR.REQUEST, {id}),
  success: (id, response) => action(TAG_SPONSOR.SUCCESS, {id, response}),
  refresh: (id, response) => action(TAG_SPONSOR.REFRESH, {id, response}),
  failure: (id, error) => action(TAG_SPONSOR.FAILURE, {id, error})
}

export const tags: ApiActionType = {
  request: (id) => action(TAGS.REQUEST, {id}),
  success: (id, response) => action(TAGS.SUCCESS, {id, response}),
  refresh: (id, response) => action(TAGS.REFRESH, {id, response}),
  failure: (id, error) => action(TAGS.FAILURE, {id, error})
}

export const tag: ApiActionType = {
  request: (id) => action(TAG.REQUEST, {id}),
  success: (id, response) => action(TAG.SUCCESS, {id, response}),
  refresh: (id, response) => action(TAG.REFRESH, {id, response}),
  failure: (id, error) => action(TAG.FAILURE, {id, error})
}

export type LoadDataType = (
  loadMore?: boolean,
  refresh?: boolean,
) => ReturnType<typeof action>

export type LoadDataSingleType = (
  loadMore: boolean,
  refresh: boolean,
  url: string
) => ReturnType<typeof action>

export type LoadBibleChaptersType = (
  loadMore: boolean,
  refresh: boolean,
  book: {}
) => ReturnType<typeof action>

export type LoadBookType = (
  loadMore: boolean,
  refresh: boolean,
  url: string,
  id: string
) => ReturnType<typeof action>

export const loadBibleBooks: LoadDataType = (loadMore, refresh) => action(LOAD_BIBLE_BOOKS, {loadMore, refresh})
export const loadBibleChapters: LoadBibleChaptersType = (loadMore, refresh, book) => action(LOAD_BIBLE_CHAPTERS, {loadMore, refresh, book})
export const loadBibleVerses = () => action(LOAD_BIBLE_VERSES)
export const loadNewRecordings: LoadDataType = (loadMore, refresh) => action(LOAD_NEW_RECORDINGS, {loadMore, refresh})
export const loadTrendingRecordings: LoadDataType = (loadMore, refresh) => action(LOAD_TRENDING_RECORDINGS, {loadMore, refresh})
export const loadFeaturedRecordings: LoadDataType = (loadMore, refresh) => action(LOAD_FEATURED_RECORDINGS, {loadMore, refresh})
export const loadBooks: LoadDataType = (loadMore, refresh) => action(LOAD_BOOKS, {loadMore, refresh})
export const loadBook: LoadBookType = (loadMore, refresh, url, id) => action(LOAD_BOOK, {loadMore, refresh, url, id})
export const loadStories: LoadDataType = (loadMore, refresh) => action(LOAD_STORIES, {loadMore, refresh})
export const loadStory: LoadDataSingleType = (loadMore, refresh, url) => action(LOAD_STORY, {loadMore, refresh, url})
export const loadPresenters: LoadDataType = (loadMore, refresh) => action(LOAD_PRESENTERS, {loadMore, refresh})
export const loadPresenter: LoadDataSingleType = (loadMore, refresh, url) => action(LOAD_PRESENTER, {loadMore, refresh, url})
export const loadConferences: LoadDataType = (loadMore, refresh) => action(LOAD_CONFERENCES, {loadMore, refresh})
export const loadConference: LoadDataSingleType = (loadMore, refresh, url) => action(LOAD_CONFERENCE, {loadMore, refresh, url})
export const loadSponsors: LoadDataType = (loadMore, refresh) => action(LOAD_SPONSORS, {loadMore, refresh})
export const loadSponsor: LoadDataSingleType = (loadMore, refresh, url) => action(LOAD_SPONSOR, {loadMore, refresh, url})
export const loadSeries: LoadDataType = (loadMore, refresh) => action(LOAD_SERIES, {loadMore, refresh})
export const loadSerie: LoadDataSingleType = (loadMore, refresh, url) => action(LOAD_SERIE, {loadMore, refresh, url})
export const loadTopics: LoadDataType = (loadMore, refresh) => action(LOAD_TOPICS, {loadMore, refresh})
export const loadTopic: LoadDataSingleType = (loadMore, refresh, url) => action(LOAD_TOPIC, {loadMore, refresh, url})
export const loadTagsBooks: LoadDataType = (loadMore, refresh) => action(LOAD_TAGS_BOOKS, {loadMore, refresh})
export const loadTagBook: LoadDataSingleType = (loadMore, refresh, url) => action(LOAD_TAG_BOOK, {loadMore, refresh, url})
export const loadTagsAlbums: LoadDataType = (loadMore, refresh) => action(LOAD_TAGS_ALBUMS, {loadMore, refresh})
export const loadTagAlbum: LoadDataSingleType = (loadMore, refresh, url) => action(LOAD_TAG_ALBUM, {loadMore, refresh, url})
export const loadTagsSponsors: LoadDataType = (loadMore, refresh) => action(LOAD_TAGS_SPONSORS, {loadMore, refresh})
export const loadTagSponsor: LoadDataSingleType = (loadMore, refresh, url) => action(LOAD_TAG_SPONSOR, {loadMore, refresh, url})
export const loadTags: LoadDataType = (loadMore, refresh) => action(LOAD_TAGS, {loadMore, refresh})
export const loadTag: LoadDataSingleType = (loadMore, refresh, url) => action(LOAD_TAG, {loadMore, refresh, url})

export const startup = () => action(STARTUP)

export const resetAndPlayTrack = (tracks: {}[], id: string | null = null) => action(RESET_AND_PLAY_TRACK, {tracks, id})
export const playPause = () => action(PLAY_PAUSE)
export const setBitRateAndReset = (bitRate: string) => action(SET_BITRATE_AND_RESET, {bitRate})

export const skipToPrevious = () => action(SKIP_TO_PREVIOUS)
export const skipToNext = () => action(SKIP_TO_NEXT)
export const replay = () => action(REPLAY)
export const forward = () => action(FORWARD)
export const download = (item: {}, downloadPath: string, downloadUrl: string, fileName: string, bitRate: string, cb?: () => {}) => action(DOWNLOAD, {item, downloadPath, downloadUrl, fileName, bitRate, cb})
export const setRate = (rate: string) => action(SET_RATE, {rate})
export const trackInitialized = (track: Track) => action(TRACK_INITIALIZED, {track})

export const REMOVE_DOWNLOAD = 'REMOVE_DOWNLOAD'
export const removeDownload = (item: {}) => action(REMOVE_DOWNLOAD, {item})

export const SYNC_FAVORITES = 'SYNC_FAVORITES'
export const syncFavorites = () => action(SYNC_FAVORITES)
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const addFavorite = (item: {}) => action(ADD_FAVORITE, {item})
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const removeFavorite = (id: string) => action(REMOVE_FAVORITE, {id})

export const SYNC_PLAYLISTS = 'SYNC_PLAYLISTS'
export const syncPlaylists = () => action(SYNC_PLAYLISTS)
export const ADD_PLAYLIST = 'ADD_PLAYLIST'
export const addPlaylist = (item: {}) => action(ADD_PLAYLIST, {item})
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST'
export const removePlaylist = (item: {}) => action(REMOVE_PLAYLIST, {item})

export const SYNC_PLAYLIST_ITEMS = 'SYNC_PLAYLIST_ITEMS'
export const syncPlaylistItems = (playlistId: string) => action(SYNC_PLAYLIST_ITEMS, {playlistId})
export const ADD_PLAYLIST_ITEM = 'ADD_PLAYLIST_ITEM'
export const addPlaylistItem = (playlistId: string, item: {}) => action(ADD_PLAYLIST_ITEM, {playlistId, item})
export const REMOVE_PLAYLIST_ITEM = 'REMOVE_PLAYLIST_ITEM'
export const removePlaylistItem = (playlistId: string, id: string) => action(REMOVE_PLAYLIST_ITEM, {playlistId, id})

export const PLAY_VIDEO = 'PLAY_VIDEO'
export const playVideo = (item: Track) => action(PLAY_VIDEO, {item})

export const REMOVE_LOCAL_BIBLE_CHAPTER = 'REMOVE_LOCAL_BIBLE_CHAPTER'
export const removeLocalBibleChapter = (item: {}) => action(REMOVE_LOCAL_BIBLE_CHAPTER, {item})
export const REMOVE_LOCAL_CHAPTER = 'REMOVE_LOCAL_CHAPTER'
export const removeLocalChapter = (item: {}) => action(REMOVE_LOCAL_CHAPTER, {item})
