import { Alert } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import I18n from 'locales'
import {
  playbackState,
  playbackTrackId,
  replay,
  forward,
  skipToPrevious,
  skipToNext
} from 'src/actions'

async function eventHandler(store, data) {
  switch(data.type) {
    // forward remote events to the player
    case 'remote-play':
      TrackPlayer.play()
      break
    case 'remote-pause':
      TrackPlayer.pause()
      break
    case 'remote-stop':
      TrackPlayer.stop()
      break
    case 'remote-next':
      store.dispatch(skipToNext())
      break
    case 'remote-previous':
      store.dispatch(skipToPrevious())
      break
    case 'remote-seek':
      TrackPlayer.seekTo(data.position)
      break
    case 'remote-jump-backward':
      store.dispatch(replay())
      break
    case 'remote-jump-forward':
      store.dispatch(forward())
      break

    // make ducking smoother by adding a fade in/out
    case 'remote-duck':
      TrackPlayer.setVolume(data.ducking ? 0.5 : 1)
      break

    // playback updates
    case 'playback-state':
      store.dispatch(playbackState(data.state))
      break
    case 'playback-track-changed':
      store.dispatch(playbackTrackId(data.nextTrack))
      break
    case 'playback-error':
      Alert.alert(I18n.t('Unable_to_download_this_media._Try_again_later.'))
      console.log('playback-error', data.error)
      break
  }
}

export default function(store) {
  return eventHandler.bind(null, store)
}
