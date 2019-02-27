import { Alert, Platform } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import I18n from 'locales'
import * as actions from 'src/actions'

let interval = null

async function eventHandler(store, data) {

  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play()
  })

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause()
  })

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.stop()
  })

  TrackPlayer.addEventListener('remote-next', () => {
    store.dispatch(actions.skipToNext())
  })

  TrackPlayer.addEventListener('remote-previous', () => {
    store.dispatch(actions.skipToPrevious())
  })

  TrackPlayer.addEventListener('remote-seek', () => {
    TrackPlayer.seekTo(data.position)
  })

  TrackPlayer.addEventListener('remote-jump-backward', () => {
    store.dispatch(actions.replay())
  })

  TrackPlayer.addEventListener('remote-jump-forward', () => {
    store.dispatch(actions.forward())
  })

  if (Platform.OS !== 'ios') { // this event type is not supported on iOS
    TrackPlayer.addEventListener('remote-duck', () => {
      TrackPlayer.setVolume(data.ducking ? 0.5 : 1)
    })
  }

  TrackPlayer.addEventListener('playback-state', async (data) => {
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
  })

  TrackPlayer.addEventListener('playback-track-changed', async (data) => {
    console.log('playback-track-changed', data)
    // This event is also fired the first time a track is played
    // we only want to reset the position whenever a track changes
    // the way to know that is if data.position or data.track has a value
    if (data.position) {
      store.dispatch(actions.playbackPosition(0))
    }
    // This event is fired diferently on iOS and Android with different data values
    // that's the reason we are using the following validation to only run this code once
    if ((Platform.OS === 'ios' && data.track) || (Platform.OS === 'android' && data.nextTrack)) {
      // set track id
      store.dispatch(actions.playbackTrackId(data.nextTrack))
      // get track
      const track = await TrackPlayer.getTrack(data.nextTrack)
      // track initialized
      store.dispatch(actions.trackInitialized(track))
    
      // Bible chapter
      if (track.chapter) {
        store.dispatch(actions.bibleChapter(track.chapter))
        store.dispatch(actions.loadBibleVerses())
      }
    }
  })

  TrackPlayer.addEventListener('playback-error', (data) => {
    Alert.alert(I18n.t('Unable_to_download_this_media._Try_again_later.'))
    console.log('playback-error', data)
  })

}

export default function(store) {
  return eventHandler.bind(null, store)
}
