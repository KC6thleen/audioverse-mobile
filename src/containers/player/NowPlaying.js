import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ImageBackground, View, TouchableOpacity, StatusBar, Platform, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import ListItem from 'src/components/list/ListItem'
import MediaContent from 'src/components/media/MediaContent'
import ProgressBar from 'src/components/progressbar/ProgressBar'
import MediaControls from 'src/components/media/MediaControls'
import MediaOptions from 'src/components/media/MediaOptions'
import imageBg from 'assets/bg.png'

class NowPlaying extends PureComponent {

  render() {
    
    const {
      navigation,
      state,
      track,
      rate,
      language,
      playPause,
      skipToPrevious,
      skipToNext,
      replay,
      forward,
      setRate
    } = this.props

    if (!track) {
      return <View />
    }

    const rightElement = <TouchableOpacity onPress={() => navigation.goBack()}><Icon name='chevron-down' style={styles.minimizeIcon} /></TouchableOpacity>

    return (
      <ImageBackground
        source={imageBg}
        style={styles.container}>
        <View style={styles.bar}>
          <StatusBar
            backgroundColor="#E53935"
            barStyle="light-content"
          />
          <ListItem
            avatar={{source: track.artwork}}
            title={track.title}
            subtitle={track.artist}
            rightElement={rightElement}
            style={{backgroundColor: '#E0E0E080'}}
          />
        </View>
        <MediaContent data={track} language={language} />
        <MediaOptions rate={rate} onSetRate={setRate} />
        <View style={styles.bottomContainer}>
          <ProgressBar />
          <MediaControls state={state} playPause={playPause} skipToPrevious={skipToPrevious} skipToNext={skipToNext} replay={replay} forward={forward} />
        </View>
      </ImageBackground>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#DDDDDD'
  },
  bar: {
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOffset: { height: 0, width: 0 },
    elevation: 2,
    borderTopWidth: Platform.OS === 'ios' ? 20 : 0,
    borderTopColor: '#E0E0E080',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },
  minimizeIcon: {
    fontSize: 42
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

NowPlaying.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: Platform.OS == 'ios' ? PropTypes.string : PropTypes.number,
  track: PropTypes.object,
  rate: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  playPause: PropTypes.func.isRequired,
  skipToPrevious: PropTypes.func.isRequired,
  skipToNext: PropTypes.func.isRequired,
  replay: PropTypes.func.isRequired,
  forward: PropTypes.func.isRequired,
  setRate: PropTypes.func.isRequired
}

export default NowPlaying
