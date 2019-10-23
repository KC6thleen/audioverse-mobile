import { Platform } from 'react-native'
import TrackPlayer, {
  Track,
  State as PlayerState,
  Capability,
} from 'react-native-track-player'
import { call, put, select } from 'redux-saga/effects'
import RNFetchBlob from 'rn-fetch-blob'
import firebase from 'react-native-firebase'

import { ContentTypes, Dirs } from '../constants'
import * as actions from '../actions'
import {
  playbackInit,
  playbackTrackId,
  playbackTracks,
  playbackRate,
  playbackPosition,
} from '../store/playback/actions'
import { addHistory } from '../store/lists/actions'
import * as selectors from '../reducers/selectors'
import { getMediaFile, typedKeys } from '../utils'
import * as api from '../services'
import NavigationService from '../utils/navigation-service'
import { changeBitRate } from '../store/settings/actions'
import { ChangeBitRateAction } from '../store/settings/types'
import { PlaybackRateAction } from '../store/playback/types'

const DOWNLOAD_DIR = Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir
const BIBLE_AND_BOOKS_DIR = Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : `${RNFetchBlob.fs.dirs.MainBundleDir}/app_appdata`

export const playerOptions = {
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.Stop,
    Capability.SeekTo,
    Capability.JumpForward,
    Capability.JumpBackward,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.PlayFromId, // required for android auto
    Capability.PlayFromSearch, // required for android auto
  ],
  compactCapabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.Stop,
    Capability.SeekTo,
    Capability.JumpForward,
    Capability.JumpBackward,
  ],
  stopWithApp: false,
}

/**
 * Setup player with all the capabilities needed
 */
export function* setupPlayer() {
  yield call(TrackPlayer.setupPlayer, { waitForBuffer: true })
  yield call(TrackPlayer.updateOptions, playerOptions)
  yield put(playbackInit())
}

/**
 * File exists
 * @param {string} file 
 */
const fileExists = async (file: string) => {
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
function* getSermonUrl(item: Track) {

  const downloads: Track[] = yield select(selectors.getDownloadsById, item.id)

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
    currentUrl = `${Platform.OS === 'android' && download.recovered ? download.dir : DOWNLOAD_DIR}/${download.downloadPath}/${encodeURIComponent(download.fileName)}`
    exists = yield call(fileExists, currentUrl)
    if (exists) {
      url = `file://${currentUrl}`
    }
  }

  // if it doesn't exist, look for a different bit rate available
  if (!exists) {
    const others = downloads.filter( el => el.bitRate !== mediaFile.bitrate )
    for (let i of others) {
      currentUrl = `${Platform.OS === 'android' && download && download.recovered ? download.dir : DOWNLOAD_DIR}/${i.downloadPath}/${encodeURIComponent(i.fileName)}`
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
function* getBookChapterUrl(item: Track) {

  const download = item.mediaFiles && item.mediaFiles.length ? item.mediaFiles[0] : {}

  let url = download.downloadURL

  const currentUrl = `${BIBLE_AND_BOOKS_DIR}/${Dirs.audiobooks}/${encodeURIComponent(download.filename)}`
  const exists = yield call(fileExists, currentUrl)
  if (exists) {
    url = `file://${currentUrl}`
  }
  console.log('url', url)
  return url
}

/**
 * Get Bible chapter url
 * @param {object} item
 */
function* getBibleChapterUrl(item: {[key: string]: any}) {

  let url = item.downloadURL
  const currentUrl = `${BIBLE_AND_BOOKS_DIR}/${Dirs.bible}/${encodeURIComponent(item.fileName)}`
  const exists = yield call(fileExists, currentUrl)
  if (exists) {
    url = `file://${currentUrl}`
  }
  console.log('url', url)
  return url
}

/**
 * Get video url
 * @param {object} item
 */
function* getVideoUrl(item: Track) {

  const videoFile = item.videoFiles && item.videoFiles.length ? item.videoFiles[0] : {}
  let url = videoFile.downloadURL
  let logUrl = videoFile.container === 'm3u8_ios' ? videoFile.logURL : null

  const downloads = yield select(selectors.getDownloadsById, item.id)
  let currentUrl = null, exists = false

  for (let i of downloads) {
    currentUrl = `${i.downloadPath}${encodeURIComponent(i.fileName)}`
    exists = yield call(fileExists, currentUrl)
    if (exists) {
      url = `file://${currentUrl}`
      logUrl = null
      break
    }
  }
  console.log('url, logUrl', url, logUrl)
  return { url, logUrl }
}

/**
 * Play video
 * @param {object} item 
 */
export function* playVideo({ item }: { type: string, item: Track }) {
  const state = yield call(TrackPlayer.getState)
  if (state === PlayerState.Playing) {
    yield call(TrackPlayer.pause)
  }
  const { url, logUrl } = yield call(getVideoUrl, item)
  if (logUrl) {
    yield call(api.fetchData, logUrl)
  }
  // analytics
  firebase.analytics().logEvent('playVideo', {
    content_type: typedKeys(ContentTypes).find(key => ContentTypes[key] === item.contentType),
    item_id: item.id,
    title: item.title,
    remote_url: url.startsWith('http') ? 1 : 0,
  })
  // show video player
  yield call(NavigationService.navigate, 'VideoPlayer', {uri: url})
}

/**
 * Resets the player, adds the array of tracks to the playlist and starts playing it
 * @param {array} tracks 
 * @param {object} id
 */
export function* resetAndPlayTrack({ tracks, id }: { type: string, tracks: Track[], id: string }) {
  const selectedTrack = !id ? tracks[0] : tracks.find(el => el.id === id)

  yield put(playbackPosition(0))
  yield put(playbackTracks(tracks))
  yield put(playbackTrackId(selectedTrack!.id))

  const autoPlay = yield select(selectors.getAutoPlay)
  if (autoPlay || selectedTrack!.contentType === ContentTypes.bible) {
    yield call(TrackPlayer.reset)
    yield call(playTracks)
  } else if (selectedTrack!.contentType !== ContentTypes.bible) {
    yield call(NavigationService.navigate, 'Player')
    yield call(TrackPlayer.reset)
  }
}

/** 
 * Plays or pauses the current track
 * @param {boolean} autoPlay
*/
export function* playTracks(autoPlay = true) {

  const tracks = yield select(selectors.getTracks)
  const track = yield select(selectors.getCurrentTrack)

  // Some of the Korean recordings do not have audio
  // in that case play video
  if (track.contentType === ContentTypes.sermon &&
    track.videoFiles.length &&
    (!track.mediaFiles || track.mediaFiles.length === 0)) {
    yield put(actions.playVideo(track))
    return
  }

  let getUrl = null
  if (track.contentType === ContentTypes.bible) {
    getUrl = getBibleChapterUrl
  } else if (track.contentType === ContentTypes.book) {
    getUrl = getBookChapterUrl
  } else {
    getUrl = getSermonUrl
  }

  const newTracks = []
  for (let i of tracks) {
    newTracks.push({
      ...i,
      url: encodeURI(yield call(getUrl, i))
    })
  }

  yield call(setupPlayer)
  yield call(TrackPlayer.add, newTracks)
  if (newTracks.length > 1 && newTracks[0].id !== track.id) {
    yield call(TrackPlayer.skip, track.id)
  }
  if (autoPlay) {
    yield call(TrackPlayer.play)
  }
}

/** 
 * Plays or pauses the current track
*/
export function* playPause() {
  const tracks = yield call(TrackPlayer.getQueue)
  const state = yield call(TrackPlayer.getState)
  if (!tracks.length || state === PlayerState.Stopped) {
    yield call(playTracks)
  } else {
    if (state === PlayerState.Playing) {
      yield call(TrackPlayer.pause)
    } else {
      yield call(TrackPlayer.play)
      // workaround on iOS play/pause resets the playback speed to 1
      // https://github.com/react-native-kit/react-native-track-player/issues/614
      if (Platform.OS === 'ios') {
        const rate = yield select(selectors.getRate)
        if (rate !== 1) {
          yield call(TrackPlayer.setRate, rate)
        }
      }
    }
  }
}

/**
 * Sets the bitrate and resets the player
 * @param {string} bitRate 
 */
export function* setBitRateAndReset({ bitRate }: ChangeBitRateAction) {
  // get the bit rate from the settings
  const bitRateFromSettings = yield select(selectors.getBitRate)
  if (bitRateFromSettings !== bitRate) {
    yield put(changeBitRate(bitRate))
    const state = yield call(TrackPlayer.getState)
    const isPlaying = state === PlayerState.Playing
    yield call(TrackPlayer.reset)
    yield call(playTracks, isPlaying)
  }
}

/** 
 * Skip to the previous track unless it is not the first one
*/
export function* skipToPrevious() {
  const queue: Track[] = yield call(TrackPlayer.getQueue)
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
  const queue: Track[] = yield call(TrackPlayer.getQueue)
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
export function* setRate({ rate }: { rate: number }) {
  yield call(TrackPlayer.setRate, rate)
  yield put(playbackRate(rate))
}

/** 
 * Track initialized
*/
export function* trackInitialized({ track }: { type: string, track: Track }) {
  console.log('track initialized', track)

  track.lastPlayedDate = new Date()
  const history: Track[] = yield select(selectors.getHistory)
  const exists = history.some(el => el.id === track.id)
  // if it's a sermon and is not in the history list add it
  if (track.contentType === ContentTypes.sermon && !exists) {
    yield put(addHistory([track]))
  }

  // set rate
  const rate = yield select(selectors.getRate)
  if (rate !== 1) {
    yield call(TrackPlayer.setRate, rate)
  }

  // set the playback position if there is a position stored and is only one track
  const position = yield select(selectors.getPosition)
  const queue = yield call(TrackPlayer.getQueue)
  if (position && queue.length === 1) {
    yield call(TrackPlayer.seekTo, position)
  }

  // analytics
  firebase.analytics().logEvent('play', {
    content_type: typedKeys(ContentTypes).find(key => ContentTypes[key] === track.contentType),
    item_id: track.id,
    title: track.title,
    remote_url: track.url!.startsWith('http') ? 1 : 0,
  })
}
