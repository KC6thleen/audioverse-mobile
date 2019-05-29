import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ActivityIndicator,
  Platform,
  StyleSheet
} from 'react-native'
import TrackPlayer from 'react-native-track-player'
import MarqueeText from 'react-native-marquee'
import { ListItem } from 'react-native-elements'

import ImageButton from 'src/components/buttons/ImageButton'
import ProgressBarMini from 'src/components/progressbar/ProgressBarMini'
import iconPlay from 'assets/ic_play.png'
import iconPause from 'assets/pause.png'
import I18n from 'locales'

const MiniPlayer = ({ navigation, track, state, actions}) => {

  if (!track) {
    return <View />
  }

  const handlePress = () => { navigation.navigate({ routeName: 'Player' }) }

  const rightElement = state === TrackPlayer.STATE_BUFFERING ?
    <ActivityIndicator size="large" /> :
    <ImageButton
      source={state == TrackPlayer.STATE_PLAYING ? iconPause : iconPlay}
      imageStyle={styles.playPause}
      onPress={actions.playPause}
      accessibilityLabel={I18n.t(state === TrackPlayer.STATE_PLAYING ? "pause" : "play" )} />

  return (
    <View style={styles.container}>
      <ListItem
        leftAvatar={
          {
            source: track.artwork && track.artwork.toString().startsWith('http') ? 
            { uri: track.artwork } : track.artwork
          }
        }
        title={<MarqueeText marqueeOnStart duration={3500} loop style={styles.title} accessibilityHint={I18n.t("maximize_player")}>{track.title}</MarqueeText>}
        subtitle={track.artist}
        onPress={handlePress}
        rightElement={rightElement}
        containerStyle={{backgroundColor: 'transparent'}}
        underlayColor="#E0E0E0"
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
    backgroundColor: '#E0E0E0'
  },
  playPause: {
    height: 42,
    width: 42,
    tintColor: '#000000'
  },
  title: {
    fontSize: Platform.OS === 'ios' ? 17 : 16
  }
})

MiniPlayer.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: Platform.OS == 'ios' ? PropTypes.string : PropTypes.number,
  track: PropTypes.object,
  actions: PropTypes.shape({
    playPause: PropTypes.func.isRequired
  })
}

export default MiniPlayer
