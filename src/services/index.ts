import {
  BASE_URL,
  BASIC_TOKEN,
  API_URL,
  BEARER_TOKEN,
} from 'react-native-dotenv'
import { Track } from 'react-native-track-player'
import { parseRecording } from '../utils'

/**
 * Fetches an API response and parses the result
 * @param {string} endpoint 
 * @param {function} parse 
 * @param {string} method
 * @param {object} body
 */
async function callApi(endpoint: string, parse: ((json: {[key: string]: any}) => {}) | null, method: string = 'GET', body: any = null) {
  const fullUrl = !endpoint.match('^http') ? BASE_URL + endpoint : endpoint
  const response: {[key: string]: any} = await fetch(fullUrl, {
    method: method,
    headers: {
      Authorization: `Basic ${BASIC_TOKEN}`
    },
    body
  })
  if (response.status === 401) {
    throw new Error(response.status)
  }
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const json = await response.json()
    return {
      result: typeof parse === 'function' ? parse(json) : json,
      nextPageUrl: json.next
    }
  } else {
    return await response.text()
  }
}

/**
 * Fetches an API response
 * @param {string} endpoint 
 */
async function callApi2(endpoint: string) {
  const fullUrl = !endpoint.match('^http') ? API_URL + endpoint : endpoint
  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    }
  })

  return await response.json()
}

export const fetchData = (url: string) => callApi(url, (json: {[key: string]: any}) => json.result)

export const fetchBibleBooks = (url: string) => callApi(url, json => {
  let result = []
  for (let item in json.result) {
    result.push(json.result[item])
  }
  return result
})

export const fetchFavorites = (url: string) => callApi(url, json => Object.keys(json.result.recording).reverse().map(el => ({
  ...json.result.recording[el][0].recordings,
  favoriteId: el
})))

export const postFavorites = (url: string, body: {}) => callApi(url, null, 'POST', body)
export const deleteFavorites = (url: string) => callApi(url, null, 'DELETE')
export const fetchPlaylists = (url: string) => callApi(url, null)
export const postPlaylists = (url:string, body: {}) => callApi(url, null, 'POST', body)
export const deletePlaylists = (url: string) => callApi(url, null, 'DELETE')
export const fetchPlaylistItems = (url: string) => callApi(url, null)
export const postPlaylistItems = (url: string, body: {}) => callApi(url, null, 'POST', body)
export const deletePlaylistItems = (url: string) => callApi(url, null, 'DELETE')
export const search = (url: string) => callApi(url, json => json.result)

export const signIn = (url: string) => callApi2(url)
export const signUp = (url: string) => callApi2(url)
