import React from 'react'
import PropTypes from 'prop-types'
import { View, Platform, StyleSheet } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import ListItem from '../list/ListItem'
import ImageButton from '../buttons/ImageButton'
import ProgressBarMini from '../progressbar/ProgressBarMini'
import iconPlay from '../../../assets/ic_play.png'
import iconPause from '../../../assets/pause.png'

const MiniPlayer = ({ onPressMetaData, track, state, playPause}) => {

  if (!track || state == TrackPlayer.STATE_NONE || state == TrackPlayer.STATE_STOPPED) {
    return <View />
  }

  const rightElement = <ImageButton
    source={state == TrackPlayer.STATE_PAUSED ? iconPlay : iconPause}
    imageStyle={styles.playPause}
    onPress={playPause}
  />

  return (
    <View style={styles.container}>
      <ListItem
        avatar={{source: track.artwork}}
        title={track.title}
        subtitle={track.artist}
        onPress={onPressMetaData}
        rightElement={rightElement}
        style={{backgroundColor: 'transparent'}}
      />
      <ProgressBarMini />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOffset: { height: 0, width: 0 },
    elevation: 2,
    backgroundColor: '#E0E0E0CC'
  },
  playPause: {
    height: 42,
    width: 42,
    tintColor: '#000000'
  },
  bar: {
    height: 2,
    backgroundColor: '#03A9F4'
  },
})

MiniPlayer.propTypes = {
  onPressMetaData: PropTypes.func.isRequired,
  state: Platform.OS == 'ios' ? PropTypes.string : PropTypes.number,
  track: PropTypes.object,
  playPause: PropTypes.func.isRequired
}

export default MiniPlayer
