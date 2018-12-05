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
export const searchPresentations = url => callApi(url, json => json.result.presentation.map(item => parseRecording(item.recordings, MediaTypes.sermon)))
