import { Platform } from 'react-native'
import { put, select, call } from 'redux-saga/effects'
import Toast from 'react-native-simple-toast'
import RNFetchBlob from 'rn-fetch-blob'

import { Endpoints, Dirs } from 'src/constants'
import * as api from 'src/services'
import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'
import I18n from 'locales'

const BIBLE_AND_BOOKS_DIR = Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : `${RNFetchBlob.fs.dirs.MainBundleDir}/app_appdata`

/**
 * Reusable fetch subroutine
 * @param {object} entity 
 * @param {function} apiFn 
 * @param {string} id 
 * @param {string} url 
 * @param {boolean} refresh 
 */
function* fetchEntity(entity, apiFn, id, url, refresh) {
  yield put( entity.request(id) )
  try {
    if (url) {
      const language = yield select(selectors.getLanguage)
      url += `${url.indexOf('?') > -1 ? '&' : '?'}lang=${language}`
    }
    const response = yield call(apiFn, url || id)
    if (refresh) {
      yield put( entity.refresh(id, response) )
    } else {
      yield put( entity.success(id, response) )
    }
  } catch (e) {
    yield put( entity.failure(id, e.message) )
    Toast.show(I18n.t('Unable_to_connect_to_the_server._Try_again_later.'))
  }
}

const fetchBibleBooks = fetchEntity.bind(null, actions.bibleBooks, api.fetchBibleBooks)
const fetchBibleChapters = fetchEntity.bind(null, actions.bibleChapters, api.fetchData)
const fetchNewRecordings = fetchEntity.bind(null, actions.newRecordings, api.fetchData)
const fetchTrendingRecordings = fetchEntity.bind(null, actions.trendingRecordings, api.fetchData)
const fetchFeaturedRecordings = fetchEntity.bind(null, actions.featuredRecordings, api.fetchData)
const fetchBooks = fetchEntity.bind(null, actions.books, api.fetchData)
const fetchBook = fetchEntity.bind(null, actions.book, api.fetchData)
const fetchStories = fetchEntity.bind(null, actions.stories, api.fetchData)
const fetchStory = fetchEntity.bind(null, actions.story, api.fetchData)
const fetchPresenters = fetchEntity.bind(null, actions.presenters, api.fetchData)
const fetchPresenter = fetchEntity.bind(null, actions.presenter, api.fetchData)
const fetchConferences = fetchEntity.bind(null, actions.conferences, api.fetchData)
const fetchConference = fetchEntity.bind(null, actions.conference, api.fetchData)
const fetchSponsors = fetchEntity.bind(null, actions.sponsors, api.fetchData)
const fetchSponsor = fetchEntity.bind(null, actions.sponsor, api.fetchData)
const fetchSeries = fetchEntity.bind(null, actions.series, api.fetchData)
const fetchSerie = fetchEntity.bind(null, actions.serie, api.fetchData)
const fetchTopics = fetchEntity.bind(null, actions.topics, api.fetchData)
const fetchTopic = fetchEntity.bind(null, actions.topic, api.fetchData)
const fetchTagsBooks = fetchEntity.bind(null, actions.tagsBooks, api.fetchData)
const fetchTagBook = fetchEntity.bind(null, actions.tagBook, api.fetchData)
const fetchTagsAlbums = fetchEntity.bind(null, actions.tagsAlbums, api.fetchData)
const fetchTagAlbum = fetchEntity.bind(null, actions.tagAlbum, api.fetchData)
const fetchTagsSponsors = fetchEntity.bind(null, actions.tagsSponsors, api.fetchData)
const fetchTagSponsor = fetchEntity.bind(null, actions.tagSponsor, api.fetchData)
const fetchTags = fetchEntity.bind(null, actions.tags, api.fetchData)
const fetchTag = fetchEntity.bind(null, actions.tag, api.fetchData)

/**
 * Reusable fetch data subroutine
 * @param {boolean} loadMore 
 * @param {boolean} refresh 
 * @param {object} pagination 
 * @param {function} fetchFn 
 * @param {string}  url 
 */
function* fetchData(loadMore, refresh, pagination, fetchFn, url) {
  console.log('ACTION....', loadMore, refresh)
  if (!pagination || !pagination.pageCount || loadMore || refresh) {
    const nextPageUrl = refresh ? null : pagination.nextPageUrl
    const response = yield call(fetchFn, null, nextPageUrl || url, refresh)
  }
}

/**
 * Load Bible books
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadBibleBooks({ loadMore, refresh }) {
  if (!loadMore && !refresh) {
    yield put(actions.bibleBooks.refresh(null, {result: []}))
  }
  const { version } = yield select(selectors.getBible)
  const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${version.id}__books.json`
  const exists = yield RNFetchBlob.fs.exists(file)
  console.log('exists', exists)
  if (refresh || !exists) {
    const pagination = yield select(selectors.getBibleBooksPagination)
    yield call(fetchData, loadMore, refresh, pagination, fetchBibleBooks, Endpoints.audiobibles + '/' + version.id)
    // write to file system
    const bibleBooksPagination = yield select(selectors.getBibleBooksPagination)
    const data = JSON.stringify(bibleBooksPagination.data)
    yield RNFetchBlob.fs.writeFile(file, data)
  } else {
    const data = yield RNFetchBlob.fs.readFile(file)
    yield put(actions.bibleBooks.success(null, {result: JSON.parse(data)}))
  }
}

/**
 * Load Bible chapters
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {string}  book
 */
export function* loadBibleChapters({ loadMore, refresh, book }) {
  if (!loadMore && !refresh) {
    yield put(actions.bibleChapters.refresh(null, {result: []}))
  }
  yield put (actions.bibleBook(book))
  const { version } = yield select(selectors.getBible)
  const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${version.id}_${book.book_id}__chapters.json`
  const exists = yield RNFetchBlob.fs.exists(file)
  console.log('exists', exists)
  if (refresh || !exists) {
    const pagination = yield select(selectors.getBibleChaptersPagination)
    const url = Endpoints.audiobibles + '/books/' + book.book_id + '?volume=' + version.id + '&testament=' + book.testament
    yield call(fetchData, loadMore, refresh, pagination, fetchBibleChapters, url)
    // write to file system
    const bibleChaptersPagination = yield select(selectors.getBibleChaptersPagination)
    const data = JSON.stringify(bibleChaptersPagination.data)
    yield RNFetchBlob.fs.writeFile(file, data)
  } else {
    const data = yield RNFetchBlob.fs.readFile(file)
    yield put(actions.bibleChapters.success(null, {result: JSON.parse(data)}))
  }

  const items = yield select(selectors.getBibleChapters)
  const ids = []
  for (let item of items) {
    const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${encodeURIComponent(item.fileName)}`
    const exists = yield call(RNFetchBlob.fs.exists, file)
    if (exists) {
      ids.push(item.id)
    }
  }
  if (ids.length) {
    yield put(actions.addLocalFiles(ids))
  }
}

/**
 * Remove local Bible chapter
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* removeLocalBibleChapter({ item }) {
  // remove mp3 file
  const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${encodeURIComponent(item.fileName)}`
  let exists = yield call(RNFetchBlob.fs.exists, file)
  if (exists) {
    try {
      yield call(RNFetchBlob.fs.unlink, file)
    } catch(err) {
      console.log(err)
    }
  }

  // remove data file
  const { version, book } = yield select(selectors.getBible)
  const dataFile = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${version.id}_${book.book_id}_chapter_${item.chapter}.json`
  const dataExists = yield call(RNFetchBlob.fs.exists, dataFile)
  if (dataExists) {
    try {
      yield call(RNFetchBlob.fs.unlink, dataFile)
    } catch(err) {
      console.log(err)
    }
  }

  yield put(actions.removeLocalFiles(item.id))
}

/**
 * Load verses
 */
export function* loadBibleVerses() {
  const { version, book, chapter } = yield select(selectors.getBible)
  const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${version.id}_${book.book_id}_chapter_${chapter}.json`
  const exists = yield RNFetchBlob.fs.exists(file)
  console.log('exists', exists)
  if (!exists) {
    const url = `${Endpoints.audiobibles}/books/${book.book_id}?volume=${version.id}&testament=${book.testament}&text=true&chapter=${chapter}`
    const data = yield call(api.fetchData, url)
    yield put(actions.bibleVerses(data))
    yield RNFetchBlob.fs.writeFile(file, data)
  } else {
    let data = yield RNFetchBlob.fs.readFile(file)
    yield put(actions.bibleVerses(data))
  }
}

/**
 * Load new recordings
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadNewRecordings({ loadMore, refresh }) {
  const pagination = yield select(selectors.getNewRecordingsPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchNewRecordings, Endpoints.new)
}

/**
 * Load trending recordings
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadTrendingRecordings({ loadMore, refresh }) {
  const pagination = yield select(selectors.getTrendingRecordingsPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchTrendingRecordings, Endpoints.trending)
}

/**
 * Load featured recordings
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadFeaturedRecordings({ loadMore, refresh }) {
  const pagination = yield select(selectors.getFeaturedRecordingsPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchFeaturedRecordings, Endpoints.featured)
}

/**
 * Load books
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadBooks({ loadMore, refresh }) {
  const language = yield select(selectors.getLanguage)
  const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.audiobooks}/audiobooks_${language}`
  const exists = yield RNFetchBlob.fs.exists(file)
  console.log('exists', exists)
  if (refresh || !exists) {
    const pagination = yield select(selectors.getBooksPagination)
    yield call(fetchData, loadMore, refresh, pagination, fetchBooks, Endpoints.books)
    // write to file system
    const booksPagination = yield select(selectors.getBooksPagination)
    // backwards compat the data should be in a result property
    const data = JSON.stringify({result: booksPagination.data})
    yield RNFetchBlob.fs.writeFile(file, data)
  } else {
    let data = yield RNFetchBlob.fs.readFile(file)
    data = JSON.parse(data).result
    yield put(actions.books.success(null, {result: data}))
  }
}

/**
 * Load book
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadBook({ loadMore, refresh, url, id }) {
  if (!loadMore && !refresh) {
    yield put(actions.book.refresh(null, {result: []}))
  }
  const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.audiobooks}/audiobookRecording_${id}`
  const exists = yield RNFetchBlob.fs.exists(file)
  console.log('exists', exists)
  if (refresh || !exists) {
    const pagination = yield select(selectors.getBookPagination)
    yield call(fetchData, loadMore, refresh, pagination, fetchBook, url)
    // write to file system
    const bookPagination = yield select(selectors.getBookPagination)
    // backwards compat the data should be in a result property
    const data = JSON.stringify({result: bookPagination.data})
    yield RNFetchBlob.fs.writeFile(file, data)
  } else {
    let data = yield RNFetchBlob.fs.readFile(file)
    data = JSON.parse(data).result
    yield put(actions.book.success(null, {result: data}))
  }

  const items = yield select(selectors.getBook)
  const ids = []
  for (let item of items) {
    const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.audiobooks}/${encodeURIComponent(item.mediaFiles[0].filename)}`
    const exists = yield call(RNFetchBlob.fs.exists, file)
    if (exists) {
      ids.push(item.id)
    }
  }
  if (ids.length) {
    yield put(actions.addLocalFiles(ids))
  }
}

/**
 * Remove local chapter
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* removeLocalChapter({ item }) {
  const file = `${BIBLE_AND_BOOKS_DIR}/${Dirs.audiobooks}/${encodeURIComponent(item.mediaFiles[0].filename)}`
  const exists = yield call(RNFetchBlob.fs.exists, file)
  if (exists) {
    try {
      yield call(RNFetchBlob.fs.unlink, file)
    } catch(err) {
      console.log(err)
    }
  }
  yield put(actions.removeLocalFiles(item.id))
}

/**
 * Load stories
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadStories({ loadMore, refresh }) {
  const pagination = yield select(selectors.getStoriesPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchStories, Endpoints.stories)
}

/**
 * Load story
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadStory({ loadMore, refresh, url }) {
  if (!loadMore && !refresh) {
    yield put(actions.story.refresh(null, {result: []}))
  }
  const pagination = yield select(selectors.getStoryPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchStory, url)
}

/**
 * Load presenters
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadPresenters({ loadMore, refresh }) {
  const pagination = yield select(selectors.getPresentersPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchPresenters, Endpoints.presenters)
}

/**
 * Load presenter
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadPresenter({ loadMore, refresh, url }) {
  if (!loadMore && !refresh) {
    yield put(actions.presenter.refresh(null, {result: []}))
  }
  const pagination = yield select(selectors.getPresenterPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchPresenter, url)
}

/**
 * Load conferences
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadConferences({ loadMore, refresh }) {
  const pagination = yield select(selectors.getConferencesPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchConferences, Endpoints.conferences)
}

/**
 * Load conference
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadConference({ loadMore, refresh, url }) {
  if (!loadMore && !refresh) {
    yield put(actions.conference.refresh(null, {result: []}))
  }
  const pagination = yield select(selectors.getConferencePagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchConference, url)
}

/**
 * Load sponsors
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadSponsors({ loadMore, refresh }) {
  const pagination = yield select(selectors.getSponsorsPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchSponsors, Endpoints.sponsors)
}

/**
 * Load sponsor
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadSponsor({ loadMore, refresh, url }) {
  if (!loadMore && !refresh) {
    yield put(actions.sponsor.refresh(null, {result: []}))
  }
  const pagination = yield select(selectors.getSponsorPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchSponsor, url)
}

/**
 * Load series
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadSeries({ loadMore, refresh }) {
  const pagination = yield select(selectors.getSeriesPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchSeries, Endpoints.series)
}

/**
 * Load serie
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadSerie({ loadMore, refresh, url }) {
  if (!loadMore && !refresh) {
    yield put(actions.serie.refresh(null, {result: []}))
  }
  const pagination = yield select(selectors.getSeriePagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchSerie, url)
}

/**
 * Load topics
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadTopics({ loadMore, refresh }) {
  const pagination = yield select(selectors.getTopicsPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchTopics, Endpoints.topics)
}

/**
 * Load topic
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadTopic({ loadMore, refresh, url }) {
  if (!loadMore && !refresh) {
    yield put(actions.topic.refresh(null, {result: []}))
  }
  const pagination = yield select(selectors.getTopicPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchTopic, url)
}

/**
 * Load tags books
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadTagsBooks({ loadMore, refresh }) {
  const pagination = yield select(selectors.getTagsBooksPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchTagsBooks, Endpoints.tagsBooks)
}

/**
 * Load tag book
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadTagBook({ loadMore, refresh, url }) {
  if (!loadMore && !refresh) {
    yield put(actions.tagBook.refresh(null, {result: []}))
  }
  const pagination = yield select(selectors.getTagBookPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchTagBook, url)
}

/**
 * Load tags albums
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadTagsAlbums({ loadMore, refresh }) {
  const pagination = yield select(selectors.getTagsAlbumsPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchTagsAlbums, Endpoints.tagsAlbums)
}

/**
 * Load tag album
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadTagAlbum({ loadMore, refresh, url }) {
  if (!loadMore && !refresh) {
    yield put(actions.tagAlbum.refresh(null, {result: []}))
  }
  const pagination = yield select(selectors.getTagAlbumPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchTagAlbum, url)
}

/**
 * Load tags sponsors
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadTagsSponsors({ loadMore, refresh }) {
  const pagination = yield select(selectors.getTagsSponsorsPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchTagsSponsors, Endpoints.tagsSponsors)
}

/**
 * Load tag sponsor
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadTagSponsor({ loadMore, refresh, url }) {
  if (!loadMore && !refresh) {
    yield put(actions.tagSponsor.refresh(null, {result: []}))
  }
  const pagination = yield select(selectors.getTagSponsorPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchTagSponsor, url)
}

/**
 * Load tags
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 */
export function* loadTags({ loadMore, refresh }) {
  const pagination = yield select(selectors.getTagsPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchTags, Endpoints.tags)
}

/**
 * Load tag
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadTag({ loadMore, refresh, url }) {
  if (!loadMore && !refresh) {
    yield put(actions.tag.refresh(null, {result: []}))
  }
  const pagination = yield select(selectors.getTagPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchTag, url)
}
