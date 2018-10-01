import { formatTime } from 'src/utils'
import { MediaTypes } from 'src/constants'
import defaultImage from 'assets/av-logo.png'

/**
 * Fetches an API response and parses the result
 * @param {string} endpoint 
 * @param {function} parse 
 */
async function callApi(endpoint, parse) {
  const fullUrl = !endpoint.startsWith('http') ? process.env['BASE_URL'] + endpoint : endpoint
  const response = await fetch(fullUrl, {
    headers: {
      Authorization: 'Basic ' + process.env['BASIC_TOKEN']
    }
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
const parseRecording = (item, mediaType) => {
    
  // artist
  if (item.presenters && item.presenters.length > 1) {
    item.artist = 'Various Presenters'
  } else if (item.presenters && item.presenters.length > 0) {
    item.artist = item.presenters[0].givenName + ' ' + item.presenters[0].surname
  } else {
    item.artist = 'Anonymous Presenter'
  }
  
  // artwork
  if (item.presenters && item.presenters.length) {
    if (item.presenters.length == 1 && item.presenters[0].photo != "default.png" ) {
      item.artwork = item.presenters[0].photo256
    } else if (item.conference && item.conference.length && item.conference[0].logo != "" ) {
      item.artwork = item.presenters[0].photo256
    }
  }

  item.artwork = item.artwork ? item.artwork : defaultImage
  item.url = item.mediaFiles.length ? item.mediaFiles[item.mediaFiles.length - 1].streamURL : ''
  item.duration = formatTime(item.duration)
  item.mediaType = mediaType

  return item
}

export const fetchBibleChapters = url => callApi(url, json => json.result)
export const fetchRecordings = url => callApi(url, json => json.result.map(item => parseRecording(item.recordings, MediaTypes.sermon)))
export const fetchBook = url => callApi(url, json => json.result.map(item => parseRecording(item.recordings, MediaTypes.book)))
export const fetchBooks = url => callApi(url, json => json.result.map(item => item.audiobooks))
export const fetchPresenters = url => callApi(url, json => json.result.map(item => item.presenters))
export const fetchConferences = url => callApi(url, json => json.result.map(item => item.conferences))
export const fetchSponsors = url => callApi(url, json => json.result.map(item => item.sponsors))
export const fetchSeries = url => callApi(url, json => json.result.map(item => item.series))
export const fetchTopics = url => callApi(url, json => json.result.map(item => item.topics))
