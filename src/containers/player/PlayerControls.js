import React from 'react'
import PropTypes from 'prop-types'
import { View, Platform, StyleSheet } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import ImageButton from 'src/components/buttons/ImageButton'
import iconPlay from 'assets/ic_play.png'
import iconPause from 'assets/pause.png'
import iconPrevious from 'assets/previous.png'
import iconNext from 'assets/next.png'
import iconReplay from 'assets/ic_replay_10.png'
import iconForward from 'assets/ic_forward_30.png'

const PlayerControls = ({ state, playPause, skipToPrevious, skipToNext, replay, forward }) => (
  <View style={styles.container}>
    <ImageButton
      source={iconReplay}
      imageStyle={styles.icon}
      onPress={replay}
    />
    <ImageButton
      source={iconPrevious}
      imageStyle={styles.icon}
      onPress={skipToPrevious}
    />
    <ImageButton
      source={state === TrackPlayer.STATE_PLAYING ? iconPause : iconPlay}
      style={styles.playPauseButton}
      imageStyle={[styles.playPauseIcon, {marginLeft: state === TrackPlayer.STATE_PAUSED ? 1 : 0}]}
      onPress={playPause}
    />
    <ImageButton
      source={iconNext}
      imageStyle={styles.icon}
      onPress={skipToNext}
    />
    <ImageButton
      source={iconForward}
      imageStyle={styles.icon}
      onPress={forward}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E080',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 5
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
    justifyContent: 'center'
  },
  playPauseIcon: {
    width: 28,
    height: 28,
    tintColor: '#FFFFFF'
  }
})

PlayerControls.propTypes = {
  state: Platform.OS == 'ios' ? PropTypes.string : PropTypes.number,
  playPause: PropTypes.func.isRequired,
  skipToPrevious: PropTypes.func.isRequired,
  skipToNext: PropTypes.func.isRequired,
  replay: PropTypes.func.isRequired,
  forward: PropTypes.func.isRequired
}

export default PlayerControls
