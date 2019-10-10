import {
  Alert,
  Platform,
  Linking,
  Share,
} from 'react-native'
import TrackPlayer, {
  State as PlayerState,
  Event as PlayerEvent,
  Track,
} from 'react-native-track-player'
import { Store } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'react-native-firebase'

import I18n from '../../locales'
import * as actions from '../actions'
import { playbackTrackId, playbackPosition } from '../store/playback/actions'
import { bibleChapter } from '../store/Bible/actions'
import prompts, { Prompt } from '../constants/prompts'
import { ContentTypes } from '../constants'

interface Data {
  position: number
  ducking: boolean
}

let interval: any = null

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
      playing()
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

  const showPromptMessage = (prompt: Prompt, prompts: Prompt[], track: Track) => {
    let message = ''
    let confirmText = ''
    let action = () => {}

    const updatePrompts = (confirmed: boolean) => {
      const updatedPrompts = prompts.map((el) => {
        if (el.name === prompt.name) {
          el.executed = new Date().getTime()
          el.confirmed = confirmed
        }
        return el
      })
      AsyncStorage.setItem('prompts', JSON.stringify(updatedPrompts))
    }

    if (prompt.name === 'donate') {
      message = 'donate_copy'
      confirmText = 'donate_now'
      action = () => {
        Linking.openURL('https://donorbox.org/audioverse-give').catch(err => console.error(err))
      }
    } else if (prompt.name === 'leave_review') {
      message = 'enjoying_av'
      confirmText = 'leave_a_review'
      action = () => {
        let url = ''
        if (Platform.OS === 'ios') {
          url = 'https://itunes.apple.com/app/id726998810?action=write-review'
        } else {
          url = 'https://play.google.com/store/apps/details?id=org.audioverse.exodus'
        }
        Linking.openURL(url).catch(err => console.error(err))
      }
    } else if (prompt.name === 'share') {
      message = 'have_you_been_blessed'
      confirmText = 'share_this_message'
      action =  async () => {
        Share.share({ message: `${I18n.t("share_this_blessing_with_you.")} ${track.shareUrl}` })
      }
    }

    updatePrompts(false)

    Alert.alert('', I18n.t(message), [
      {
        text: I18n.t('Cancel'),
        style: 'cancel'
      },
      {
        text: I18n.t(confirmText),
        onPress: () => {
          action()
          updatePrompts(true)
          firebase.analytics().logEvent(prompt.name)
        }
      },
    ])
  }

  const playing = () => {
    // set a new interval to save the current position
    interval = setInterval(async () => {
      const trackId = await TrackPlayer.getCurrentTrack()
      const track = await TrackPlayer.getTrack(trackId)
      const duration = await TrackPlayer.getDuration()
      const position = await TrackPlayer.getPosition()
      store.dispatch(playbackPosition(position))

      const bumperDuration = 45 // secs
      if (track.contentType !== ContentTypes.sermon ||
        position + bumperDuration < duration) {
        return
      }
      
      let promptsString = await AsyncStorage.getItem('prompts')
      let promptsData: Prompt[] = []
      if (!promptsString) {
        AsyncStorage.setItem('prompts', JSON.stringify(prompts))
        promptsData = prompts
      } else {
        promptsData = JSON.parse(promptsString)
      }

      const frequency = 86400000 // millisecs (1 day)
      const currentTime = new Date().getTime()

      // look for items to renew
      promptsData = promptsData.map((el) => {
        if (el.renew > 0 && currentTime >= (el.executed + el.renew)) {
          el.confirmed = false
        }
        return el
      })

      // recent prompt
      const recentPrompt = promptsData.some((el) => {
        console.log('currentTime and el.executed + frequency', currentTime, (el.executed + frequency))
        if (currentTime < (el.executed + frequency)) {
          return true
        }
        return false
      })

      console.log('prompts data', promptsData, recentPrompt)

      if (!recentPrompt) {
        // find one prompt
        const prompt = promptsData.find((el) => {
          if (!el.confirmed && currentTime >= (el.executed + frequency)) {
            return true
          }
          return false
        })
        if (prompt) {
          showPromptMessage(prompt, promptsData, track)
        }
      }
    }, 10000)
  }

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
