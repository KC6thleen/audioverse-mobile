import { parseRecording } from 'src/utils'
import { BASE_URL, BASIC_TOKEN, API_URL, BEARER_TOKEN } from 'react-native-dotenv'

/**
 * Fetches an API response and parses the result
 * @param {string} endpoint 
 * @param {function} parse 
 */
async function callApi(endpoint, parse, method, body) {
  const fullUrl = !endpoint.startsWith('http') ? BASE_URL + endpoint : endpoint
  const response = await fetch(fullUrl, {
    method: method ? method : 'GET',
    headers: {
      Authorization: `Basic ${BASIC_TOKEN}`
    },
    body
  })
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
async function callApi2(endpoint) {
  const fullUrl = !endpoint.startsWith('http') ? API_URL + endpoint : endpoint
  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    }
  })

  return await response.json()
}

export const fetchData = url => callApi(url, json => json.result)

export const fetchBibleBooks = url => callApi(url, json => {
  let result = []
  for (item in json.result) {
    result.push(json.result[item])
  }
  return result
})

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
export const searchPresentations = url => callApi(url, json => json.result.presentation.map(item => parseRecording(item.recordings)))

export const signIn = url => callApi2(url)
export const signUp = url => callApi2(url)
