import { Track } from 'react-native-track-player'

import {
  PLAYBACK_INIT,
  PLAYBACK_POSITION,
  PLAYBACK_RATE,
  PLAYBACK_TRACKS,
  PLAYBACK_TRACK_ID,
  PlaybackActionTypes,
} from './types'

export const playbackInit = (): PlaybackActionTypes => {
  return {
    type: PLAYBACK_INIT,
  }
}

export const playbackTrackId = (trackId: string): PlaybackActionTypes => {
  return {
    type: PLAYBACK_TRACK_ID,
    trackId,
  }
}

export const playbackTracks = (tracks: Track[]): PlaybackActionTypes => {
  return {
    type: PLAYBACK_TRACKS,
    tracks,
  }
}

export const playbackRate = (rate: number): PlaybackActionTypes => {
  return {
    type: PLAYBACK_RATE,
    rate,
  }
}

export const playbackPosition = (position: number): PlaybackActionTypes => {
  return {
    type: PLAYBACK_POSITION,
    position,
  }
}
