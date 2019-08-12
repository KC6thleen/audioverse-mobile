import React, { useState } from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
} from "react-native-track-player"

import ImageButton from '../../components/buttons/ImageButton'
import iconPlay from '../../../assets/ic_play.png'
import iconPause from '../../../assets/pause.png'
import iconPrevious from '../../../assets/previous.png'
import iconNext from '../../../assets/next.png'
import iconReplay from '../../../assets/ic_replay_10.png'
import iconForward from '../../../assets/ic_forward_30.png'
import I18n from '../../../locales'

interface Props {
  playPause: () => void
  skipToPrevious: () => void
  skipToNext: () => void
  replay: () => void
  forward: () => void
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E080',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#000000',
    margin: 10,
  },
  playPauseButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseIcon: {
    width: 28,
    height: 28,
    tintColor: '#FFFFFF',
  },
})

const PlayerControls: React.FC<Props> = ({ playPause, skipToPrevious, skipToNext, replay, forward }) => {

  const playbackState = usePlaybackState()
  console.log('playbackState', playbackState)
  const [loading, setLoading] = useState(false)
  // on iOS the Media Player library that we are using does not
  // enter the loading state until it has loaded/buffered the mp3 file, however
  // in order to let the user know that the file is being loaded we are
  // using our own loading state, it is set to true when the a track is changed
  // and is set to false when the playback-state change.
  useTrackPlayerEvents(["playback-track-changed"], () => {
    setLoading(true) // show activity indicator
  })

  useTrackPlayerEvents(["playback-state"], () => {
    if (loading) {
      setLoading(false) // hide activity indicator
    }
  })
  
  return (
    <View style={styles.container}>
      <ImageButton
        source={iconReplay}
        imageStyle={styles.icon}
        onPress={replay}
        accessibilityLabel={I18n.t("rewind_10_seconds")}
      />
      <ImageButton
        source={iconPrevious}
        imageStyle={styles.icon}
        onPress={skipToPrevious}
        accessibilityLabel={I18n.t("previous")}
      />
      { loading || playbackState === TrackPlayer.STATE_BUFFERING
        ? <ActivityIndicator size="large" />
        : <ImageButton
            source={playbackState === TrackPlayer.STATE_PLAYING ? iconPause : iconPlay}
            style={styles.playPauseButton}
            imageStyle={[styles.playPauseIcon, {marginLeft: playbackState === TrackPlayer.STATE_PAUSED ? 1 : 0}]}
            onPress={playPause}
            accessibilityLabel={I18n.t(playbackState === TrackPlayer.STATE_PLAYING ? "pause" : "play" )}
          />
      }
      <ImageButton
        source={iconNext}
        imageStyle={styles.icon}
        onPress={skipToNext}
        accessibilityLabel={I18n.t("next")}
      />
      <ImageButton
        source={iconForward}
        imageStyle={styles.icon}
        onPress={forward}
        accessibilityLabel={I18n.t("fast_forward_30_seconds")}
      />
    </View>
  )

}

export default PlayerControls
