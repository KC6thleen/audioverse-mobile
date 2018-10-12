export const getLanguage = state => state.settings.language
export const getBitRate = state => state.settings.bitRate
export const getAutoPlay = state => state.settings.autoPlay

export const getTracks = state => state.playback.tracks
export const getCurrentTrack = state => state.playback.tracks.find(el => el.id === state.playback.currentTrackId)
export const getCurrentTrackId = state => state.playback.currentTrackId
export const getRate = state => state.playback.rate
export const getPlaybackState = state => state.playback.state
export const getNav = state => state.nav

export const getBible = state => state.bible
export const getBibleBooks = state => state.bibleBooks.data
export const getBibleBooksPagination = state => state.bibleBooks
export const getBibleChapters = state => state.bibleChapters.data
export const getBibleChaptersPagination = state => state.bibleChapters
export const getNewRecordings = state => state.newRecordings.data
export const getNewRecordingsPagination = state => state.newRecordings
export const getTrendingRecordings = state => state.trendingRecordings.data
export const getTrendingRecordingsPagination = state => state.trendingRecordings
export const getFeaturedRecordings = state => state.featuredRecordings.data
export const getFeaturedRecordingsPagination = state => state.featuredRecordings
export const getBooks = state => state.books.data
export const getBooksPagination = state => state.books
export const getBook = state => state.book.data
export const getBookPagination = state => state.book
export const getStories = state => state.stories.data
export const getStoriesPagination = state => state.stories
export const getStory = state => state.story.data
export const getStoryPagination = state => state.story
export const getPresenters = state => state.presenters.data
export const getPresentersPagination = state => state.presenters
export const getPresenter = state => state.presenter.data
export const getPresenterPagination = state => state.presenter
export const getConferences = state => state.conferences.data
export const getConferencesPagination = state => state.conferences
export const getConference = state => state.conference.data
export const getConferencePagination = state => state.conference
export const getSponsors = state => state.sponsors.data
export const getSponsorsPagination = state => state.sponsors
export const getSponsor = state => state.sponsor.data
export const getSponsorPagination = state => state.sponsor
export const getSeries = state => state.series.data
export const getSeriesPagination = state => state.series
export const getSerie = state => state.serie.data
export const getSeriePagination = state => state.serie
export const getTopics = state => state.topics.data
export const getTopicsPagination = state => state.topics
export const getTopic = state => state.topic.data
export const getTopicPagination = state => state.topic

export const getDownloads = state => state.lists.downloads
export const getDownloadsById = (state, id) => state.lists.downloads.filter(el => el.id === id)
export const getDownloadById = (state, id) => state.lists.downloads.find(el => el.id === id)
export const getFavorites = state => state.lists.favorites
export const getPlaylists = state => state.lists.playlists
export const getHistory = state => state.lists.history
export const getDownloadsQueue = state => state.downloadsQueue.queue
export const getDownloading = state => state.downloadsQueue.downloading
