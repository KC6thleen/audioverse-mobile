import { call, put, select } from 'redux-saga/effects'
import TrackPlayer from 'react-native-track-player'

import * as actions from 'src/actions'
import * as selectors from 'src/reducers/selectors'

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

/**
 * Resets the player, adds the array of tracks or one track to the playlist and starts playing it
 * @param {array} tracks 
 * @param {object} track
 */
export function* resetAndPlayTrack({ tracks, track }) {
  yield call(TrackPlayer.reset)
  yield put(actions.playbackTrack(track))
  if (tracks) {
    yield call(TrackPlayer.add, [...tracks])
    yield call(TrackPlayer.skip, track.id)
  } else {
    yield call(TrackPlayer.add, track)
  }
  yield call(TrackPlayer.play)
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
