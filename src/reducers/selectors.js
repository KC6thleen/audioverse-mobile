import { ContentTypes } from 'src/constants'
import { parseRecording, parseBibleChapter } from 'src/utils'
import { defaultImage } from 'src/styles'

export const getLanguage = state => state.settings.language
export const getBitRate = state => state.settings.bitRate
export const getAutoPlay = state => state.settings.autoPlay

export const getTracks = state => state.playback.tracks
export const getCurrentTrack = state => state.playback.tracks.find(el => el.id === state.playback.currentTrackId)
export const getCurrentTrackId = state => state.playback.currentTrackId
export const getRate = state => state.playback.rate
export const getPosition = state => state.playback.position

export const getBible = state => state.bible
export const getBibleBooks = state => state.bibleBooks.data
export const getBibleBooksPagination = state => state.bibleBooks
export const getBibleChapters = state => state.bibleChapters.data.map(item => {
  const chapter = parseBibleChapter(item, state.bible)
  return {
    ...chapter,
    local: state.localFiles.indexOf(chapter.id) !== -1
  }
})
export const getBibleChaptersPagination = state => state.bibleChapters
export const getNewRecordings = state => state.newRecordings.data.map(item => parseRecording(item.recordings))
export const getNewRecordingsPagination = state => state.newRecordings
export const getTrendingRecordings = state => state.trendingRecordings.data.map(item => parseRecording(item.recordings))
export const getTrendingRecordingsPagination = state => state.trendingRecordings
export const getFeaturedRecordings = state => state.featuredRecordings.data.map(item => parseRecording(item.recordings))
export const getFeaturedRecordingsPagination = state => state.featuredRecordings
export const getBooks = state => state.books.data.map(item => item.audiobooks)
export const getBooksPagination = state => state.books
export const getBook = state => state.book.data.map(item => {
  const recording = parseRecording(item.recordings)
  // contentType property was added later on on the API, since the book is being cached check if it doesn't exists
  if (!recording.contentType) {
    recording.contentType = ContentTypes.book
  }

  const mediaFile = { ...recording.mediaFiles[0] }
  mediaFile.filename = mediaFile.filename.substring(mediaFile.filename.lastIndexOf("/") + 1)
  if (/^00_/i.test(mediaFile.filename)) {
    // some chapters have the same file name in other books
    // like 00_Foreword.mp3 and 00_Preface.mp3
    // so we need to add some text to avoid to overwrite them
    mediaFile.filename = `${recording.id}_${mediaFile.filename}`
  }
  recording.mediaFiles = [mediaFile]
  return {
    ...recording,
    local: state.localFiles.indexOf(recording.id) !== -1
  }
})
export const getBookPagination = state => state.book
export const getStories = state => state.stories.data.map(item => item.audiobooks)
export const getStoriesPagination = state => state.stories
export const getStory = state => state.story.data.map(item => parseRecording(item.recordings))
export const getStoryPagination = state => state.story
export const getPresenters = state => state.presenters.data.map(item => item.presenters)
export const getPresentersPagination = state => state.presenters
export const getPresenter = state => state.presenter.data.map(item => parseRecording(item.recordings))
export const getPresenterPagination = state => state.presenter
export const getConferences = state => state.conferences.data.map(item => item.conferences)
export const getConferencesPagination = state => state.conferences
export const getConference = state => state.conference.data.map(item => parseRecording(item.recordings))
export const getConferencePagination = state => state.conference
export const getSponsors = state => state.sponsors.data.map(item =>  (
  {
    ...item.sponsors,
    photo86: item.sponsors.logo !== '' ? item.sponsors.photo86 : defaultImage
  }
))
export const getSponsorsPagination = state => state.sponsors
export const getSponsor = state => state.sponsor.data.map(item => parseRecording(item.recordings))
export const getSponsorPagination = state => state.sponsor
export const getSeries = state => state.series.data.map(item => item.series)
export const getSeriesPagination = state => state.series
export const getSerie = state => state.serie.data.map(item => parseRecording(item.recordings))
export const getSeriePagination = state => state.serie
export const getTopics = state => state.topics.data.map(item => item.topics)
export const getTopicsPagination = state => state.topics
export const getTopic = state => state.topic.data.map(item => parseRecording(item.recordings))
export const getTopicPagination = state => state.topic
export const getTagsBooks = state => state.tagsBooks.data
export const getTagsBooksPagination = state => state.tagsBooks
export const getTagBook = state => state.tagBook.data.map(item => parseRecording(item.recordings))
export const getTagBookPagination = state => state.tagBook
export const getTagsAlbums = state => state.tagsAlbums.data.map(item => item.series)
export const getTagsAlbumsPagination = state => state.tagsAlbums
export const getTagAlbum = state => state.tagAlbum.data.map(item => parseRecording(item.recordings))
export const getTagAlbumPagination = state => state.tagAlbum
export const getTagsSponsors = state => state.tagsSponsors.data.map(item => (
  {
    ...item.sponsors,
    photo86: item.sponsors.logo !== '' ? item.sponsors.photo86 : defaultImage
  }
))
export const getTagsSponsorsPagination = state => state.tagsSponsors
export const getTagSponsor = state => state.tagSponsor.data.map(item => parseRecording(item.recordings))
export const getTagSponsorPagination = state => state.tagSponsor
export const getTags = state => state.tags.data
export const getTagsPagination = state => state.tags
export const getTag = state => state.tag.data.map(item => parseRecording(item.recordings))
export const getTagPagination = state => state.tag

export const getDownloads = state => state.lists.downloads.map(el => parseRecording(el))
export const getDownloadsById = (state, id) => getDownloads(state).filter(el => el.id === id)
export const getDownloadById = (state, id) => getDownloads(state).find(el => el.id === id)
export const isFavorite = state => state.lists.favorites.some(el => el.id === state.playback.currentTrackId && !el.deleted)
export const getFavorite = (state, id) => state.lists.favorites.find(el => el.id === id)
export const getAllFavorites = state => state.lists.favorites
export const getFavorites = state => state.lists.favorites.filter(el => !el.deleted).map(el => parseRecording(el))
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
export const getPlaylistItems = (state, playlistId) => state.lists.playlistsItems.filter(el => !el.deleted && el.playlistId === playlistId).map(el => parseRecording(el))
export const getPlaylistItem = (state, playlistId, id) => state.lists.playlistsItems.find(el => el.playlistId === playlistId && el.id === id)
export const getLocalPlaylistItems = (state, playlistId) =>state.lists.playlistsItems.filter(el => el.local && el.playlistId === playlistId)
export const getDeletedPlaylistItems = (state, playlistId) =>state.lists.playlistsItems.filter(el => el.deleted && el.playlistId === playlistId)

export const getHistory = state => state.lists.history.map(el => parseRecording(el))
export const getDownloadsQueue = state => state.downloadsQueue.queue
export const getDownloadsQueueItems = state => state.downloadsQueue.queue.map(el => el.data)
export const getDownloading = state => state.downloadsQueue.downloading
export const getUser = state => state.user
