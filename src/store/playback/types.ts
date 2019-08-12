import { Track } from 'react-native-track-player'
export interface PlaybackState {
  init: boolean
  currentTrackId: string | null
  tracks: Track[]
  rate: number
  position: number
}

export const PLAYBACK_INIT = 'PLAYBACK_INIT'
export const PLAYBACK_TRACK_ID = 'PLAYBACK_TRACK_ID'
export const PLAYBACK_TRACKS = 'PLAYBACK_TRACKS'
export const PLAYBACK_RATE = 'PLAYBACK_RATE'
export const PLAYBACK_POSITION = 'PLAYBACK_POSITION'

interface PlaybackInitAction {
  type: typeof PLAYBACK_INIT
}

interface PlaybackTrackIdAction {
  type: typeof PLAYBACK_TRACK_ID
  trackId: string
}

interface PlaybackTracksAction {
  type: typeof PLAYBACK_TRACKS
  tracks: Track[]
}

export interface PlaybackRateAction {
  type: typeof PLAYBACK_RATE
  rate: number
}

interface PlaybackPositionAction {
  type: typeof PLAYBACK_POSITION
  position: number
}

export type PlaybackActionTypes = PlaybackInitAction | PlaybackTrackIdAction |
  PlaybackTracksAction | PlaybackRateAction | PlaybackPositionAction
