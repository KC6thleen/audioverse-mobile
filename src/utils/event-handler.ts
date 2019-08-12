import { Alert, Platform } from 'react-native'
import TrackPlayer from 'react-native-track-player'
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
    } else if (data.state === TrackPlayer.STATE_READY) {
      // TrackPlayer.STATE_READY is not triggered on Android
      // so we call playbackReady on playback-track-changed
      if (Platform.OS === 'ios') {
        playbackReady()
      }
    } else if (data.state === TrackPlayer.STATE_PLAYING) {
      // set a new interval to save the current position
      interval = setInterval(async () => {
        const position = await TrackPlayer.getPosition()
        store.dispatch(playbackPosition(position))
      }, 10000)
    } else if (data.state === TrackPlayer.STATE_PAUSED) {
      // clear interval
      clearInterval(interval)
    } else if (data.state === TrackPlayer.STATE_STOPPED) {
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

  TrackPlayer.addEventListener('playback-track-changed', (data) => {
    console.log('playback-track-changed', data)
    // react-native-track-player doesn't fire the ready event on Android,
    // that's why we are using the playback-track-changed event
    if ((Platform.OS === 'android' && data.nextTrack)) {
      playbackReady()
    }
  })

  TrackPlayer.addEventListener('playback-error', (data) => {
    Alert.alert(I18n.t('Unable_to_download_this_media._Try_again_later.'))
    console.log('playback-error', data)
  })

}

export default function(store: Store) {
  return eventHandler.bind(null, store)
}
