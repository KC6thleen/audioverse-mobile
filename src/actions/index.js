export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

export const PLAYER_STATE = 'PLAYER_STATE'
export const PLAYBACK_INIT = 'PLAYBACK_INIT'
export const PLAYBACK_TRACK_ID = 'PLAYBACK_TRACK_ID'
export const PLAYBACK_TRACKS = 'PLAYBACK_TRACKS'

export const RESET_AND_PLAY_TRACK = 'RESET_AND_PLAY_TRACK'
export const PLAY_PAUSE = 'PLAY_PAUSE'

export const SKIP_TO_PREVIOUS = 'SKIP_TO_PREVIOUS'
export const SKIP_TO_NEXT = 'SKIP_TO_NEXT'
export const REPLAY = 'REPLAY'
export const FORWARD = 'FORWARD'
export const DOWNLOAD = 'DOWNLOAD'
export const SET_RATE = 'SET_RATE'
export const TRACK_INITIALIZED = 'TRACK_INITIALIZED'
export const PLAYBACK_RATE = 'PLAYBACK_RATE'
export const PLAYBACK_POSITION = 'PLAYBACK_POSITION'

export const SET_BIBLE_VERSION = 'SET_BIBLE_VERSION'
export const BIBLE_VERSION = 'BIBLE_VERSION'
export const BIBLE_BOOK = 'BIBLE_BOOK'
export const BIBLE_CHAPTER = 'BIBLE_CHAPTER'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const REFRESH = 'REFRESH'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST,  SUCCESS, REFRESH, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

function action(type, payload = {}) {
  return {type, ...payload}
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

export const LOAD_BIBLE_BOOKS = 'LOAD_BIBLE_BOOKS'
export const LOAD_BIBLE_CHAPTERS = 'LOAD_BIBLE_CHAPTERS'
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

export const bibleBooks = {
  request: id => action(BIBLE_BOOKS.REQUEST, {id}),
  success: (id, response) => action(BIBLE_BOOKS.SUCCESS, {id, response}),
  refresh: (id, response) => action(BIBLE_BOOKS.REFRESH, {id, response}),
  failure: (id, error) => action(BIBLE_BOOKS.FAILURE, {id, error})
}

export const bibleChapters = {
  request: id => action(BIBLE_CHAPTERS.REQUEST, {id}),
  success: (id, response) => action(BIBLE_CHAPTERS.SUCCESS, {id, response}),
  refresh: (id, response) => action(BIBLE_CHAPTERS.REFRESH, {id, response}),
  failure: (id, error) => action(BIBLE_CHAPTERS.FAILURE, {id, error})
}

export const newRecordings = {
  request: id => action(NEW_RECORDINGS.REQUEST, {id}),
  success: (id, response) => action(NEW_RECORDINGS.SUCCESS, {id, response}),
  refresh: (id, response) => action(NEW_RECORDINGS.REFRESH, {id, response}),
  failure: (id, error) => action(NEW_RECORDINGS.FAILURE, {id, error})
}

export const trendingRecordings = {
  request: id => action(TRENDING_RECORDINGS.REQUEST, {id}),
  success: (id, response) => action(TRENDING_RECORDINGS.SUCCESS, {id, response}),
  refresh: (id, response) => action(TRENDING_RECORDINGS.REFRESH, {id, response}),
  failure: (id, error) => action(TRENDING_RECORDINGS.FAILURE, {id, error})
}

export const featuredRecordings = {
  request: id => action(FEATURED_RECORDINGS.REQUEST, {id}),
  success: (id, response) => action(FEATURED_RECORDINGS.SUCCESS, {id, response}),
  refresh: (id, response) => action(FEATURED_RECORDINGS.REFRESH, {id, response}),
  failure: (id, error) => action(FEATURED_RECORDINGS.FAILURE, {id, error})
}

export const books = {
  request: id => action(BOOKS.REQUEST, {id}),
  success: (id, response) => action(BOOKS.SUCCESS, {id, response}),
  refresh: (id, response) => action(BOOKS.REFRESH, {id, response}),
  failure: (id, error) => action(BOOKS.FAILURE, {id, error})
}

export const book = {
  request: id => action(BOOK.REQUEST, {id}),
  success: (id, response) => action(BOOK.SUCCESS, {id, response}),
  refresh: (id, response) => action(BOOK.REFRESH, {id, response}),
  failure: (id, error) => action(BOOK.FAILURE, {id, error})
}

export const stories = {
  request: id => action(STORIES.REQUEST, {id}),
  success: (id, response) => action(STORIES.SUCCESS, {id, response}),
  refresh: (id, response) => action(STORIES.REFRESH, {id, response}),
  failure: (id, error) => action(STORIES.FAILURE, {id, error})
}

export const story = {
  request: id => action(STORY.REQUEST, {id}),
  success: (id, response) => action(STORY.SUCCESS, {id, response}),
  refresh: (id, response) => action(STORY.REFRESH, {id, response}),
  failure: (id, error) => action(STORY.FAILURE, {id, error})
}

export const presenters = {
  request: id => action(PRESENTERS.REQUEST, {id}),
  success: (id, response) => action(PRESENTERS.SUCCESS, {id, response}),
  refresh: (id, response) => action(PRESENTERS.REFRESH, {id, response}),
  failure: (id, error) => action(PRESENTERS.FAILURE, {id, error})
}

export const presenter = {
  request: id => action(PRESENTER.REQUEST, {id}),
  success: (id, response) => action(PRESENTER.SUCCESS, {id, response}),
  refresh: (id, response) => action(PRESENTER.REFRESH, {id, response}),
  failure: (id, error) => action(PRESENTER.FAILURE, {id, error})
}

export const conferences = {
  request: id => action(CONFERENCES.REQUEST, {id}),
  success: (id, response) => action(CONFERENCES.SUCCESS, {id, response}),
  refresh: (id, response) => action(CONFERENCES.REFRESH, {id, response}),
  failure: (id, error) => action(CONFERENCES.FAILURE, {id, error})
}

export const conference = {
  request: id => action(CONFERENCE.REQUEST, {id}),
  success: (id, response) => action(CONFERENCE.SUCCESS, {id, response}),
  refresh: (id, response) => action(CONFERENCE.REFRESH, {id, response}),
  failure: (id, error) => action(CONFERENCE.FAILURE, {id, error})
}

export const sponsors = {
  request: id => action(SPONSORS.REQUEST, {id}),
  success: (id, response) => action(SPONSORS.SUCCESS, {id, response}),
  refresh: (id, response) => action(SPONSORS.REFRESH, {id, response}),
  failure: (id, error) => action(SPONSORS.FAILURE, {id, error})
}

export const sponsor = {
  request: id => action(SPONSOR.REQUEST, {id}),
  success: (id, response) => action(SPONSOR.SUCCESS, {id, response}),
  refresh: (id, response) => action(SPONSOR.REFRESH, {id, response}),
  failure: (id, error) => action(SPONSOR.FAILURE, {id, error})
}

export const series = {
  request: id => action(SERIES.REQUEST, {id}),
  success: (id, response) => action(SERIES.SUCCESS, {id, response}),
  refresh: (id, response) => action(SERIES.REFRESH, {id, response}),
  failure: (id, error) => action(SERIES.FAILURE, {id, error})
}

export const serie = {
  request: id => action(SERIE.REQUEST, {id}),
  success: (id, response) => action(SERIE.SUCCESS, {id, response}),
  refresh: (id, response) => action(SERIE.REFRESH, {id, response}),
  failure: (id, error) => action(SERIE.FAILURE, {id, error})
}

export const topics = {
  request: id => action(TOPICS.REQUEST, {id}),
  success: (id, response) => action(TOPICS.SUCCESS, {id, response}),
  refresh: (id, response) => action(TOPICS.REFRESH, {id, response}),
  failure: (id, error) => action(TOPICS.FAILURE, {id, error})
}

export const topic = {
  request: id => action(TOPIC.REQUEST, {id}),
  success: (id, response) => action(TOPIC.SUCCESS, {id, response}),
  refresh: (id, response) => action(TOPIC.REFRESH, {id, response}),
  failure: (id, error) => action(TOPIC.FAILURE, {id, error})
}

export const loadBibleBooks = (loadMore, refresh) => action(LOAD_BIBLE_BOOKS, {loadMore, refresh})
export const loadBibleChapters = (loadMore, refresh, testament, book) => action(LOAD_BIBLE_CHAPTERS, {loadMore, refresh, testament, book})
export const loadNewRecordings = (loadMore, refresh) => action(LOAD_NEW_RECORDINGS, {loadMore, refresh})
export const loadTrendingRecordings = (loadMore, refresh) => action(LOAD_TRENDING_RECORDINGS, {loadMore, refresh})
export const loadFeaturedRecordings = (loadMore, refresh) => action(LOAD_FEATURED_RECORDINGS, {loadMore, refresh})
export const loadBooks = (loadMore, refresh) => action(LOAD_BOOKS, {loadMore, refresh})
export const loadBook = (loadMore, refresh, url) => action(LOAD_BOOK, {loadMore, refresh, url})
export const loadStories = (loadMore, refresh) => action(LOAD_STORIES, {loadMore, refresh})
export const loadStory = (loadMore, refresh, url) => action(LOAD_STORY, {loadMore, refresh, url})
export const loadPresenters = (loadMore, refresh) => action(LOAD_PRESENTERS, {loadMore, refresh})
export const loadPresenter = (loadMore, refresh, url) => action(LOAD_PRESENTER, {loadMore, refresh, url})
export const loadConferences = (loadMore, refresh) => action(LOAD_CONFERENCES, {loadMore, refresh})
export const loadConference = (loadMore, refresh, url) => action(LOAD_CONFERENCE, {loadMore, refresh, url})
export const loadSponsors = (loadMore, refresh) => action(LOAD_SPONSORS, {loadMore, refresh})
export const loadSponsor = (loadMore, refresh, url) => action(LOAD_SPONSOR, {loadMore, refresh, url})
export const loadSeries = (loadMore, refresh) => action(LOAD_SERIES, {loadMore, refresh})
export const loadSerie = (loadMore, refresh, url) => action(LOAD_SERIE, {loadMore, refresh, url})
export const loadTopics = (loadMore, refresh) => action(LOAD_TOPICS, {loadMore, refresh})
export const loadTopic = (loadMore, refresh, url) => action(LOAD_TOPIC, {loadMore, refresh, url})

export const changeLanguage = language => action(CHANGE_LANGUAGE, {language})

export const playerState = state => action(PLAYER_STATE, {state})
export const playbackInit = () => action(PLAYBACK_INIT)
export const playbackTrackId = trackId => action(PLAYBACK_TRACK_ID, {trackId})
export const playbackTracks = tracks => action(PLAYBACK_TRACKS, {tracks})

export const resetAndPlayTrack = (tracks, id) => action(RESET_AND_PLAY_TRACK, {tracks, id})
export const playPause = () => action(PLAY_PAUSE)

export const skipToPrevious = () => action(SKIP_TO_PREVIOUS)
export const skipToNext = () => action(SKIP_TO_NEXT)
export const replay = () => action(REPLAY)
export const forward = () => action(FORWARD)
export const download = (item, downloadPath, downloadUrl, fileName, bitRate) => action(DOWNLOAD, {item, downloadPath, downloadUrl, fileName, bitRate})
export const setRate = rate => action(SET_RATE, {rate})
export const trackInitialized = (track) => action(TRACK_INITIALIZED, {track})
export const playbackRate = rate => action(PLAYBACK_RATE, {rate})
export const playbackPosition = position => action(PLAYBACK_POSITION, {position})

export const setBibleVersion = version => action(SET_BIBLE_VERSION, {version})
export const bibleVersion = version => action(BIBLE_VERSION, {version})
export const bibleBook = (testament, book) => action(BIBLE_BOOK, {testament, book})
export const bibleChapter = chapter => action(BIBLE_CHAPTER, {chapter})

export const ADD_TO_DOWNLOADS_QUEUE = 'ADD_TO_DOWNLOADS_QUEUE'
export const REMOVE_FROM_DOWNLOADS_QUEUE = 'REMOVE_FROM_DOWNLOADS_QUEUE'
export const SET_DOWNLOADING = 'SET_DOWNLOADING'
export const DOWNLOAD_PROGRESS = 'DOWNLOAD_PROGRESS'
export const addToDownloadsQueue = (item) => action(ADD_TO_DOWNLOADS_QUEUE, {item})
export const removeFromDownloadsQueue = (item) => action(REMOVE_FROM_DOWNLOADS_QUEUE, {item})
export const setDownloading = (downloading) => action(SET_DOWNLOADING, {downloading})
export const downloadProgress = (item, progress) => action(DOWNLOAD_PROGRESS, {item, progress})

const SET = 'SET'
const ADD = 'ADD'
const REMOVE = 'REMOVE'

function createMyListsTypes(base) {
  return [SET, ADD, REMOVE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export const DOWNLOADS = createMyListsTypes('DOWNLOADS')
export const downloads = {
  set: items => action(DOWNLOADS.SET, {items}),
  add: items => action(DOWNLOADS.ADD, {items}),
  remove: item => action(DOWNLOADS.REMOVE, {item})
}

export const REMOVE_DOWNLOAD = 'REMOVE_DOWNLOAD'
export const removeDownload = item => action(REMOVE_DOWNLOAD, {item})

export const FAVORITES = createMyListsTypes('FAVORITES')
export const favorites = {
  set: items => action(FAVORITES.SET, {items}),
  add: items => action(FAVORITES.ADD, {items}),
  remove: item => action(FAVORITES.REMOVE, {item})
}

export const PLAYLISTS = createMyListsTypes('PLAYLISTS')
export const playlists = {
  set: items => action(PLAYLISTS.SET, {items}),
  add: items => action(PLAYLISTS.ADD, {items}),
  remove: item => action(PLAYLISTS.REMOVE, {item})
}

export const PLAYLIST_ITEMS = createMyListsTypes('PLAYLIST_ITEMS')
export const playlistsItems = {
  set: items => action(PLAYLIST_ITEMS.SET, {items}),
  add: items => action(PLAYLIST_ITEMS.ADD, {items}),
  remove: item => action(PLAYLIST_ITEMS.REMOVE, {item})
}

export const HISTORY = createMyListsTypes('HISTORY')
export const history = {
  set: items => action(HISTORY.SET, {items}),
  add: items => action(HISTORY.ADD, {items}),
  remove: item => action(HISTORY.REMOVE, {item})
}

export const AUTOPLAY = 'AUTOPLAY'
export const setAutoPlay = autoPlay => action(AUTOPLAY, {autoPlay})

export const USER = 'USER'
export const setUser = user => action(USER, {user})

export const SYNC_FAVORITES = 'SYNC_FAVORITES'
export const syncFavorites = () => action(SYNC_FAVORITES)
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const addFavorite = item => action(ADD_FAVORITE, {item})
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const removeFavorite = id => action(REMOVE_FAVORITE, {id})

export const SYNC_PLAYLISTS = 'SYNC_PLAYLISTS'
export const syncPlaylists = () => action(SYNC_PLAYLISTS)
export const ADD_PLAYLIST = 'ADD_PLAYLIST'
export const addPlaylist = item => action(ADD_PLAYLIST, {item})
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST'
export const removePlaylist = item => action(REMOVE_PLAYLIST, {item})

export const SYNC_PLAYLIST_ITEMS = 'SYNC_PLAYLIST_ITEMS'
export const syncPlaylistItems = (playlistId) => action(SYNC_PLAYLIST_ITEMS, {playlistId})
export const ADD_PLAYLIST_ITEM = 'ADD_PLAYLIST_ITEM'
export const addPlaylistItem = (playlistId, item) => action(ADD_PLAYLIST_ITEM, {playlistId, item})
export const REMOVE_PLAYLIST_ITEM = 'REMOVE_PLAYLIST_ITEM'
export const removePlaylistItem = (playlistId, id) => action(REMOVE_PLAYLIST_ITEM, {playlistId, id})

export const PLAY_VIDEO = 'PLAY_VIDEO'
export const playVideo = item => action(PLAY_VIDEO, {item})

export const LOG_OUT = 'LOG_OUT'
export const logOut = item => action(LOG_OUT)
