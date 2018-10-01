import { put, select, call } from 'redux-saga/effects'

import { Endpoints } from 'src/constants'
import * as api from 'src/services'
import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'

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
  }
}

const fetchBibleBooks = fetchEntity.bind(null, actions.bibleBooks, api.fetchBibleBooks)
const fetchBibleChapters = fetchEntity.bind(null, actions.bibleChapters, api.fetchBibleChapters)
const fetchNewRecordings = fetchEntity.bind(null, actions.newRecordings, api.fetchRecordings)
const fetchTrendingRecordings = fetchEntity.bind(null, actions.trendingRecordings, api.fetchRecordings)
const fetchFeaturedRecordings = fetchEntity.bind(null, actions.featuredRecordings, api.fetchRecordings)
const fetchBooks = fetchEntity.bind(null, actions.books, api.fetchBooks)
const fetchBook = fetchEntity.bind(null, actions.book, api.fetchBook)
const fetchStories = fetchEntity.bind(null, actions.stories, api.fetchBooks)
const fetchStory = fetchEntity.bind(null, actions.story, api.fetchRecordings)
const fetchPresenters = fetchEntity.bind(null, actions.presenters, api.fetchPresenters)
const fetchPresenter = fetchEntity.bind(null, actions.presenter, api.fetchRecordings)
const fetchConferences = fetchEntity.bind(null, actions.conferences, api.fetchConferences)
const fetchConference = fetchEntity.bind(null, actions.conference, api.fetchRecordings)
const fetchSponsors = fetchEntity.bind(null, actions.sponsors, api.fetchSponsors)
const fetchSponsor = fetchEntity.bind(null, actions.sponsor, api.fetchRecordings)
const fetchSeries = fetchEntity.bind(null, actions.series, api.fetchSeries)
const fetchSerie = fetchEntity.bind(null, actions.serie, api.fetchRecordings)
const fetchTopics = fetchEntity.bind(null, actions.topics, api.fetchTopics)
const fetchTopic = fetchEntity.bind(null, actions.topic, api.fetchRecordings)

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
  const pagination = yield select(selectors.getBibleBooks)
  const { version } = yield select(selectors.getBible)
  yield call(fetchData, loadMore, refresh, pagination, fetchBibleBooks, Endpoints.audiobibles + '/' + version.id)
}

/**
 * Load Bible chapters
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {string}  testament
 * @param {string}  book
 */
export function* loadBibleChapters({ loadMore, refresh, testament, book }) {
  if (!loadMore && !refresh) {
    yield put(actions.bibleChapters.refresh(null, {result: []}))
  }
  yield put (actions.bibleBook(testament, book))
  const pagination = yield select(selectors.getBibleBooks)
  const { version } = yield select(selectors.getBible)
  const url = Endpoints.audiobibles + '/books/' + book + '?volume=' + version.id + '&testament=' + testament
  yield call(fetchData, loadMore, refresh, pagination, fetchBibleChapters, url)
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
  const pagination = yield select(selectors.getBooksPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchBooks, Endpoints.books)
}

/**
 * Load book
 * @param {boolean} loadMore 
 * @param {boolean} refresh
 * @param {url} string
 */
export function* loadBook({ loadMore, refresh, url }) {
  if (!loadMore && !refresh) {
    yield put(actions.book.refresh(null, {result: []}))
  }
  const pagination = yield select(selectors.getBookPagination)
  yield call(fetchData, loadMore, refresh, pagination, fetchBook, url)
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
