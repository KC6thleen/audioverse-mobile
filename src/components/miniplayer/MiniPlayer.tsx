import React, { useState } from 'react'
import {
  View,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native'
import TrackPlayer, {
  Track,
  usePlaybackState,
  useTrackPlayerEvents,
} from "react-native-track-player"
import MarqueeText from 'react-native-marquee'
import { ListItem } from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'

import ImageButton from '../buttons/ImageButton'
import ProgressBarMini from '../progressbar/ProgressBarMini'
import iconPlay from '../../../assets/ic_play.png'
import iconPause from '../../../assets/pause.png'
import I18n from '../../../locales'

interface Props extends NavigationScreenProps {
  track: Track | undefined
  actions: {
    playPause: () => void
  }
}

const styles = StyleSheet.create({
  container: {
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOffset: { height: 0, width: 0 },
    elevation: 2,
    backgroundColor: '#E0E0E0',
  },
  playPause: {
    height: 42,
    width: 42,
    tintColor: '#000000',
  },
  title: {
    fontSize: Platform.OS === 'ios' ? 17 : 16,
  },
})

const MiniPlayer: React.FC<Props> = ({ navigation, track, actions }) => {
  
  const playbackState = usePlaybackState()
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

  if (!track) {
    return null
  }

  const handlePress = () => { navigation.navigate({ routeName: 'Player' }) }

  const rightAvatar = loading || playbackState === TrackPlayer.STATE_BUFFERING
    ? <ActivityIndicator size="large" />
    : undefined

  const rightElement = <ImageButton
    source={playbackState === TrackPlayer.STATE_PLAYING ? iconPause : iconPlay}
    imageStyle={styles.playPause}
    onPress={actions.playPause}
    accessibilityLabel={I18n.t(playbackState === TrackPlayer.STATE_PLAYING ? "pause" : "play" )} />

  return (
    <View style={styles.container}>
      <ListItem
        leftAvatar={
          {
            source: track.artwork && track.artwork.toString().startsWith('http') ? 
            { uri: track.artwork } : track.artwork
          }
        }
        title={
          <MarqueeText marqueeOnStart duration={3500} loop style={styles.title} accessibilityHint={I18n.t("maximize_player")}>{track.title}</MarqueeText>
        }
        subtitle={track.artist}
        subtitleProps={{numberOfLines: 1}}
        onPress={handlePress}
        rightAvatar={rightAvatar}
        rightElement={rightElement}
        containerStyle={{backgroundColor: 'transparent'}}
        underlayColor="#E0E0E0"
      />
      <ProgressBarMini />
    </View>
  )

}

export default MiniPlayer
