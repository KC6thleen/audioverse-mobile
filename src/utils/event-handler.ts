import { Alert, Platform } from 'react-native'
import TrackPlayer, {
  State as PlayerState,
  Event as PlayerEvent,
} from 'react-native-track-player'
import { Store } from 'redux'

import I18n from '../../locales'
import * as actions from '../actions'
import { playbackTrackId, playbackPosition } from '../store/playback/actions'
import { bibleChapter } from '../store/Bible/actions'

let interval: any = null

interface Data {
  position: number
  ducking: boolean
}

async function eventHandler(store: Store, data: Data) {

  TrackPlayer.addEventListener(PlayerEvent.RemotePlay, () => {
    TrackPlayer.play()
  })

  TrackPlayer.addEventListener(PlayerEvent.RemotePause, () => {
    TrackPlayer.pause()
  })

  TrackPlayer.addEventListener(PlayerEvent.RemoteStop, () => {
    TrackPlayer.stop()
  })

  TrackPlayer.addEventListener(PlayerEvent.RemoteNext, () => {
    store.dispatch(actions.skipToNext())
  })

  TrackPlayer.addEventListener(PlayerEvent.RemotePrevious, () => {
    store.dispatch(actions.skipToPrevious())
  })

  TrackPlayer.addEventListener(PlayerEvent.RemoteSeek, () => {
    TrackPlayer.seekTo(data.position)
  })

  TrackPlayer.addEventListener(PlayerEvent.RemoteJumpBackward, () => {
    store.dispatch(actions.replay())
  })

  TrackPlayer.addEventListener(PlayerEvent.RemoteJumpForward, () => {
    store.dispatch(actions.forward())
  })

  if (Platform.OS !== 'ios') { // this event type is not supported on iOS
    TrackPlayer.addEventListener(PlayerEvent.RemoteDuck, () => {
      TrackPlayer.setVolume(data.ducking ? 0.5 : 1)
    })
  }

  TrackPlayer.addEventListener(PlayerEvent.PlaybackState, async (data) => {
    console.log('playback-state', data, PlayerState)
    if (data.state === PlayerState.Buffering) {
      // clear interval
      clearInterval(interval)
    } else if (data.state === PlayerState.Playing) {
      // set a new interval to save the current position
      interval = setInterval(async () => {
        const position = await TrackPlayer.getPosition()
        store.dispatch(playbackPosition(position))
      }, 10000)
    } else if (data.state === PlayerState.Paused) {
      // clear interval
      clearInterval(interval)
    } else if (data.state === PlayerState.Stopped) {
      // clear interval
      clearInterval(interval)
      // reset the position
      store.dispatch(playbackPosition(0))
    }
  })

  const playbackReady = async () => {
    const trackId = await TrackPlayer.getCurrentTrack()
    // set track id
    store.dispatch(playbackTrackId(trackId))
    // get track
    const track = await TrackPlayer.getTrack(trackId)
    // track initialized
    store.dispatch(actions.trackInitialized(track))
  
    // Bible chapter
    if (track.chapter) {
      store.dispatch(bibleChapter(track.chapter))
      store.dispatch(actions.loadBibleVerses())
    }
  }

  TrackPlayer.addEventListener(PlayerEvent.PlaybackTrackChanged, (data) => {
    console.log('playback-track-changed', data)
    if (Platform.OS === 'ios' || (Platform.OS === 'android' && data.nextTrack)) {
      playbackReady()
    }
  })

  TrackPlayer.addEventListener(PlayerEvent.PlaybackError, (data) => {
    Alert.alert(I18n.t('Unable_to_download_this_media._Try_again_later.'))
    console.log('playback-error', data)
  })

}

export default function(store: Store) {
  return eventHandler.bind(null, store)
}
