import { parseRecording } from 'src/services'
import { MediaTypes } from 'src/constants'

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

export const getDownloads = state => state.lists.downloads.map(el => parseRecording(el, MediaTypes.sermon))
export const getDownloadsById = (state, id) => getDownloads(state).filter(el => el.id === id)
export const getDownloadById = (state, id) => getDownloads(state).find(el => el.id === id)
export const isFavorite = state => state.lists.favorites.some(el => el.id === state.playback.currentTrackId && !el.deleted)
export const getFavorite = (state, id) => state.lists.favorites.find(el => el.id === id)
export const getAllFavorites = state => state.lists.favorites
export const getFavorites = state => state.lists.favorites.filter(el => !el.deleted).map(el => parseRecording(el, MediaTypes.sermon))
export const getLocalFavorites = state => state.lists.favorites.filter(el => !el.favoriteId)
export const getDeletedFavorites = state => state.lists.favorites.filter(el => el.deleted)
export const getAllPlaylists = state => state.lists.playlists
export const getPlaylists = state => state.lists.playlists.filter(el => !el.deleted)
export const getLocalPlaylists = state => state.lists.playlists.filter(el => el.local)
export const getDeletedPlaylists = state => state.lists.playlists.filter(el => el.deleted)
export const getPlaylistsForCurrentTrack = state => state.lists.playlists.filter(el => !el.deleted).map(el => {
  const selected = state.lists.playlistsItems.some( item => !item.deleted && item.playlistId === el.id && item.id === state.playback.currentTrackId )
  return {
    ...el,
    selected
  }
})

export const getAllPlaylistsItems = state => state.lists.playlistsItems
export const getPlaylistItems = (state, playlistId) => state.lists.playlistsItems.filter(el => !el.deleted && el.playlistId === playlistId).map(el => parseRecording(el, MediaTypes.sermon))
export const getPlaylistItem = (state, playlistId, id) => state.lists.playlistsItems.find(el => el.playlistId === playlistId && el.id === id)
export const getLocalPlaylistItems = (state, playlistId) =>state.lists.playlistsItems.filter(el => el.local && el.playlistId === playlistId)
export const getDeletedPlaylistItems = (state, playlistId) =>state.lists.playlistsItems.filter(el => el.deleted && el.playlistId === playlistId)

export const getHistory = state => state.lists.history.map(el => parseRecording(el, MediaTypes.sermon))
export const getDownloadsQueue = state => state.downloadsQueue.queue
export const getDownloading = state => state.downloadsQueue.downloading
export const getUser = state => state.user
