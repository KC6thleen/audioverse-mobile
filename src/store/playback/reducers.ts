import {
  PLAYBACK_INIT,
  PLAYBACK_POSITION,
  PLAYBACK_RATE,
  PLAYBACK_TRACKS,
  PLAYBACK_TRACK_ID,
  PlaybackActionTypes,
  PlaybackState,
} from './types'

const initialState: PlaybackState = {
  init: false,
  currentTrackId: null,
  tracks: [],
  rate: 1,
  position: 0,
}

export function playbackReducer(
  state = initialState,
  action: PlaybackActionTypes
): PlaybackState {
  switch(action.type) {
    case PLAYBACK_INIT:
      return {
        ...state,
        init: true
      }
    case PLAYBACK_TRACK_ID:
      return {
        ...state,
        currentTrackId: action.trackId
      }
    case PLAYBACK_TRACKS:
      return {
        ...state,
        tracks: action.tracks
      }
    case PLAYBACK_RATE:
      return {
        ...state,
        rate: action.rate
      }
    case PLAYBACK_POSITION:
      return {
        ...state,
        position: action.position
      }
    default:
      return state
  }
}
