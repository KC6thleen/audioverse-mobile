import { formatTime, getPresenterName, getPresenterPicture } from 'src/utils'
import { MediaTypes } from 'src/constants'

/**
 * Fetches an API response and parses the result
 * @param {string} endpoint 
 * @param {function} parse 
 */
async function callApi(endpoint, parse, method, body) {
  const fullUrl = !endpoint.startsWith('http') ? process.env['BASE_URL'] + endpoint : endpoint
  const response = await fetch(fullUrl, {
    method: method ? method : 'GET',
    headers: {
      Authorization: 'Basic ' + process.env['BASIC_TOKEN']
    },
    body
  })
  const json = await response.json()
  return {
    result: typeof parse === 'function' ? parse(json) : json,
    nextPageUrl: json.next
  }
}

export const fetchBibleBooks = url => callApi(url, json => {
  let result = []
  for (item in json.result) {
    result.push(json.result[item])
  }
  return result
})

/**
 * Parses the data into Track strcutures
 * https://github.com/react-native-kit/react-native-track-player/wiki/Documentation#track-structure
 * @param {object} item 
 */
export const parseRecording = (item, mediaType) => ({
  ...item,
  artist: getPresenterName(item),
  artwork: getPresenterPicture(item),
  duration: formatTime(item.duration),
  mediaType: mediaType
})

export const fetchBibleChapters = url => callApi(url, json => json.result)
export const fetchRecordings = url => callApi(url, json => json.result.map(item => parseRecording(item.recordings, MediaTypes.sermon)))
export const fetchBook = url => callApi(url, json => json.result.map(item => parseRecording(item.recordings, MediaTypes.book)))
export const fetchBooks = url => callApi(url, json => json.result.map(item => item.audiobooks))
export const fetchPresenters = url => callApi(url, json => json.result.map(item => item.presenters))
export const fetchConferences = url => callApi(url, json => json.result.map(item => item.conferences))
export const fetchSponsors = url => callApi(url, json => json.result.map(item => item.sponsors))
export const fetchSeries = url => callApi(url, json => json.result.map(item => item.series))
export const fetchTopics = url => callApi(url, json => json.result.map(item => item.topics))
export const fetchFavorites = url => callApi(url, json => Object.keys(json.result.recording).reverse().map(el => ({
  ...json.result.recording[el][0].recordings,
  favoriteId: el
})))
export const postFavorites = (url, body) => callApi(url, null, 'POST', body)
export const deleteFavorites = url => callApi(url, null, 'DELETE')
export const fetchPlaylists = url => callApi(url, null)
export const postPlaylists = (url, body) => callApi(url, null, 'POST', body)
export const deletePlaylists = url => callApi(url, null, 'DELETE')
export const fetchPlaylistItems = url => callApi(url, null)
export const postPlaylistItems = (url, body) => callApi(url, null, 'POST', body)
export const deletePlaylistItems = url => callApi(url, null, 'DELETE')
