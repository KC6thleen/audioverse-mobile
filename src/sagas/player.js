import { call, put, select } from 'redux-saga/effects'
import TrackPlayer from 'react-native-track-player'
import RNFetchBlob from 'rn-fetch-blob'

import { MediaTypes, Dirs } from 'src/constants'
import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'
import { getMediaFile } from 'src/utils'

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
    const state = yield call(TrackPlayer.setupPlayer)
    const trackId = yield call(TrackPlayer.getCurrentTrack)
    const track = yield call(TrackPlayer.getTrack, trackId)
    yield put(actions.playbackState(state))
    yield put(actions.playbackTrackId(trackId))
    yield put(actions.playbackTrack(track))
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

  // get the media file using the bit rate from the settings
  const bitRate = yield select(selectors.getBitRate)
  const mediaFile = getMediaFile(item.mediaFiles, bitRate)

  let url = mediaFile.downloadURL

  const download = downloads.find( el => el.bitRate === mediaFile.bitrate )

  let currentUrl = null, exists = false

  if (download) {
    currentUrl = `${RNFetchBlob.fs.dirs.DocumentDir}/${Dirs.presentations}/${download.fileName}`
    exists = yield call(fileExists, currentUrl)
    if (exists) {
      url = `file://${currentUrl}`
    }
  }

  // if it doesn't exist, look for a different bit rate available
  if (!exists) {
    const others = downloads.filter( el => el.bitRate !== mediaFile.bitrate )
    for (let i of others) {
      currentUrl = `${RNFetchBlob.fs.dirs.DocumentDir}/${Dirs.presentations}/${i.fileName}`
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
    const currentUrl = `${RNFetchBlob.fs.dirs.DocumentDir}/${Dirs.audiobooks}/${download.fileName}`
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
    const currentUrl = `${RNFetchBlob.fs.dirs.DocumentDir}/${Dirs.bible}/${download.fileName}`
    const exists = yield call(fileExists, currentUrl)
    if (exists) {
      url = `file://${currentUrl}`
    }
  }
  console.log('url', url)
  return url
}

/**
 * Resets the player, adds the array of tracks or one track to the playlist and starts playing it
 * @param {array} tracks 
 * @param {object} track
 */
export function* resetAndPlayTrack({ tracks, track }) {
  yield call(TrackPlayer.reset)

  let getUrl = null
  if (track.mediaType === MediaTypes.sermon) {
    getUrl = getSermonUrl
  } else if (track.mediaType === MediaTypes.bible) {
    getUrl = getBibleChapterUrl
  } else if (track.mediaType === MediaTypes.book) {
    getUrl = getBookChapterUrl
  }

  const newTrack = {
    ...track,
    url: yield call(getUrl, track)
  }

  yield put(actions.playbackTrack(newTrack))
  if (tracks) {
    const newTracks = []
    for (let i of tracks) {
      newTracks.push({
        ...i,
        url: yield call(getUrl, i)
      })
    }
    
    yield call(TrackPlayer.add, newTracks)
    yield call(TrackPlayer.skip, newTrack.id)
  } else {
    yield call(TrackPlayer.add, newTrack)
    yield call(TrackPlayer.play)
  }
}

/** 
 * Plays or pauses the current track
*/
export function* playPause() {
  const playbackState = yield select(selectors.getPlaybackState)
  if (playbackState == TrackPlayer.STATE_PAUSED) {
    yield call(TrackPlayer.play)
  } else {
    yield call(TrackPlayer.pause)
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
    yield put(actions.playbackTrack(queue[index-1]))
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
    yield put(actions.playbackTrack(queue[index+1]))
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
export function* setRate() {
  const increment = 0.25
  let rate = yield select(selectors.getRate)
  rate = rate < 2 ? rate += increment : 1
  yield call(TrackPlayer.setRate, rate)
  yield put(actions.playbackRate(rate))
}
