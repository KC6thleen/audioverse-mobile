import { Alert } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import I18n from 'locales'
import * as actions from 'src/actions'

let interval = null

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
      store.dispatch(actions.skipToNext())
      break
    case 'remote-previous':
      store.dispatch(actions.skipToPrevious())
      break
    case 'remote-seek':
      TrackPlayer.seekTo(data.position)
      break
    case 'remote-jump-backward':
      store.dispatch(actions.replay())
      break
    case 'remote-jump-forward':
      store.dispatch(actions.forward())
      break

    // make ducking smoother by adding a fade in/out
    case 'remote-duck':
      TrackPlayer.setVolume(data.ducking ? 0.5 : 1)
      break

    // playback updates
    case 'playback-state':
      console.log('playback-state', data)
      if (data.state === TrackPlayer.STATE_BUFFERING) {
        // clear interval
        clearInterval(interval)
      } else if (data.state === TrackPlayer.STATE_PLAYING) {
        // set a new interval to save the current position
        interval = setInterval(async () => {
          const position = await TrackPlayer.getPosition()
          store.dispatch(actions.playbackPosition(position))
        }, 10000)
      } else if (data.state === TrackPlayer.STATE_PAUSED) {
        // clear interval
        clearInterval(interval)
      } else if (data.state === TrackPlayer.STATE_STOPPED) {
        // clear interval
        clearInterval(interval)
        // reset the position
        store.dispatch(actions.playbackPosition(0))
      }
      // player state
      store.dispatch(actions.playerState(data.state))
      break
    case 'playback-track-changed':
      console.log('playback-track-changed', data)
      // This event is also fired the first time a track is played
      // we only want to reset the position whenever a track changes
      // the way to know that is if data.position or data.track has a value
      if (data.position) {
        store.dispatch(actions.playbackPosition(0))
      }
      // set track id
      store.dispatch(actions.playbackTrackId(data.nextTrack))
      // get track
      const track = await TrackPlayer.getTrack(data.nextTrack)
      // track initialized
      store.dispatch(actions.trackInitialized(track))
        // Bible chapter
      if (track.chapter) {
        store.dispatch(actions.bibleChapter(track.chapter))
      }
      break
    case 'playback-error':
      Alert.alert(I18n.t('Unable_to_download_this_media._Try_again_later.'))
      console.log('playback-error', data)
      break
  }
}

export default function(store) {
  return eventHandler.bind(null, store)
}
