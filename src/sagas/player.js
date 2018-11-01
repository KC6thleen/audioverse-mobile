import TrackPlayer from 'react-native-track-player'
import { call, put, select } from 'redux-saga/effects'
import RNFetchBlob from 'rn-fetch-blob'

import { MediaTypes, Dirs } from 'src/constants'
import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'
import { getMediaFile } from 'src/utils'
import NavigationService from 'src/utils/navigation-service'

/**
 * Setup player with all the capabilities needed
 */
export function* setupPlayer() {
  yield call(TrackPlayer.setupPlayer)
  yield call(TrackPlayer.updateOptions, {
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SEEK_TO,
      TrackPlayer.CAPABILITY_JUMP_FORWARD,
      TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_PLAY_FROM_ID, // required for android auto
      TrackPlayer.CAPABILITY_PLAY_FROM_SEARCH // required for android auto
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SEEK_TO,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
    ],
    stopWithApp: false
  })
  yield put(actions.playbackInit())
}

/**
 * Updates the playback state, and the current track
 */
export function* playbackUpdate() {
  try {
    yield call(TrackPlayer.setupPlayer)
    const state = yield call(TrackPlayer.getState)
    const tracks = yield call(TrackPlayer.getQueue)
    const trackId = yield call(TrackPlayer.getCurrentTrack)
    yield put(actions.playerState(state))
    yield put(actions.playbackTracks(tracks))
    yield put(actions.playbackTrackId(trackId))
  } catch (e) {
    // the player is probably not yet initialized
    // which means we don't have to update anything
  }
}

const fileExists = async (file) => {
  try {
    return await RNFetchBlob.fs.exists(file)
  } catch(err) {
    return false
  }
}

/**
 * Get sermon url
 * @param {object} item
 */
function* getSermonUrl(item) {

  const downloads = yield select(selectors.getDownloadsById, item.id)

  let bitRate = null
  if (!item.bitRate) {
    // get the bit rate from the settings
    bitRate = yield select(selectors.getBitRate)
  } else {
    // use the bit rate provided in the object
    bitRate = item.bitRate
  }
  
  const mediaFile = getMediaFile(item.mediaFiles, bitRate)

  let url = mediaFile.downloadURL

  const download = downloads.find( el => el.bitRate === mediaFile.bitrate )

  let currentUrl = null, exists = false

  if (download) {
    currentUrl = `${download.downloadPath}${download.fileName}`
    exists = yield call(fileExists, currentUrl)
    if (exists) {
      url = `file://${currentUrl}`
    }
  }

  // if it doesn't exist, look for a different bit rate available
  if (!exists) {
    const others = downloads.filter( el => el.bitRate !== mediaFile.bitrate )
    for (let i of others) {
      currentUrl = `${i.downloadPath}${i.fileName}`
      exists = yield call(fileExists, currentUrl)
      if (exists) {
        url = `file://${currentUrl}`
        break
      }
    }
  }
  console.log('url', url)
  return url
}

/**
 * Get book chapter url
 * @param {object} item
 */
function* getBookChapterUrl(item) {

  const download = yield select(selectors.getDownloadById, item.id)

  let url = item.mediaFiles && item.mediaFiles.length ? item.mediaFiles[0].downloadURL : ''

  if (download) {
    const currentUrl = `${download.downloadPath}${download.fileName}`
    const exists = yield call(fileExists, currentUrl)
    if (exists) {
      url = `file://${currentUrl}`
    }
  }
  console.log('url', url)
  return url
}

/**
 * Get Bible chapter url
 * @param {object} item
 */
function* getBibleChapterUrl(item) {

  const download = yield select(selectors.getDownloadById, item.id)

  let url = item.downloadURL

  if (download) {
    const currentUrl = `${download.downloadPath}${download.fileName}`
    const exists = yield call(fileExists, currentUrl)
    if (exists) {
      url = `file://${currentUrl}`
    }
  }
  console.log('url', url)
  return url
}

/**
 * Resets the player, adds the array of tracks to the playlist and starts playing it
 * @param {array} tracks 
 * @param {object} id
 */
export function* resetAndPlayTrack({ tracks, id }) {
  yield call(TrackPlayer.reset)

  const selectedTrack = !id ? tracks[0] : tracks.find(el => el.id === id)

  yield put(actions.playbackTracks(tracks))
  yield put(actions.playbackTrackId(selectedTrack.id))

  const autoPlay = yield select(selectors.getAutoPlay)
  if (autoPlay) {
    yield call(playTracks)
  } else {
    yield call(NavigationService.navigate, 'Player')
  }
}

/** 
 * Plays or pauses the current track
*/
export function* playTracks() {

  const tracks = yield select(selectors.getTracks)
  const currentTrack = yield select(selectors.getCurrentTrack)

  let getUrl = null
  if (currentTrack.mediaType === MediaTypes.bible) {
    getUrl = getBibleChapterUrl
  } else if (currentTrack.mediaType === MediaTypes.book) {
    getUrl = getBookChapterUrl
  } else {
    getUrl = getSermonUrl
  }

  const newTracks = []
  for (let i of tracks) {
    newTracks.push({
      ...i,
      url: yield call(getUrl, i)
    })
  }
  yield call(TrackPlayer.add, newTracks)
  yield call(TrackPlayer.skip, currentTrack.id)
  yield call(TrackPlayer.play)

  // set position
  const savedPosition = yield select(selectors.getPosition)
  if (savedPosition) {
    yield call(TrackPlayer.seekTo, savedPosition)
  }
}

/** 
 * Plays or pauses the current track
*/
export function* playPause() {
  const tracks = yield call(TrackPlayer.getQueue)
  if (!tracks.length) {
    yield call(playTracks)
  } else {
    const state = yield call(TrackPlayer.getState)
    if (state === TrackPlayer.STATE_PLAYING) {
      yield call(TrackPlayer.pause)
    } else {
      yield call(TrackPlayer.play)
    }
  }
}

/** 
 * Skip to the previous track unless it is not the first one
*/
export function* skipToPrevious() {
  const queue = yield call(TrackPlayer.getQueue)
  const currentTrackId = yield select(selectors.getCurrentTrackId)
  const index = queue.findIndex(item => item.id === currentTrackId )
  
  if (index > 0) {
    yield call(TrackPlayer.skipToPrevious)
  }
}

/** 
 * Skip to the next track unless it is not the last one
*/
export function* skipToNext() {
  const queue = yield call(TrackPlayer.getQueue)
  const currentTrackId = yield select(selectors.getCurrentTrackId)
  const index = queue.findIndex(item => item.id === currentTrackId )
  
  if (queue.length > index + 1) {
    yield call(TrackPlayer.skipToNext)
  }
}

/** 
 * Replays the current track
*/
export function* replay() {
  const seconds = 10
  let position = yield call(TrackPlayer.getPosition)
  position =  position > seconds ? position - seconds : 0
  yield call(TrackPlayer.seekTo, position)
}

/** 
 * Fast-forward the current track
*/
export function* forward() {
  const seconds = 30
  const duration = yield call(TrackPlayer.getDuration)
  let position = yield call(TrackPlayer.getPosition)
  position =  position + seconds <= duration ? position + seconds : duration
  yield call(TrackPlayer.seekTo, position)
}

/** 
 * Sets the player rate
*/
export function* setRate({ rate }) {
  yield call(TrackPlayer.setRate, rate)
  yield put(actions.playbackRate(rate))
}

/** 
 * Sets the player rate
*/
export function* setInitialRate() {
  const rate = yield select(selectors.getRate)
  if (rate !== 1) {
    yield call(TrackPlayer.setRate, rate)
  }
}
