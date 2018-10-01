import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ImageBackground, View, TouchableOpacity, StatusBar, Platform, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import ActionSheet from 'react-native-action-sheet'

import ListItem from 'src/components/list/ListItem'
import PlayerContent from './PlayerContent'
import ProgressBar from 'src/components/progressbar/ProgressBar'
import PlayerControls from './PlayerControls'
import PlayerOptions from './PlayerOptions'
import imageBg from 'assets/bg.png'
import I18n from 'locales'
import { MediaTypes, Dirs } from 'src/constants'

class Player extends PureComponent {

  _downloadSermon = () => {
	
    let bitratesIndex = [], bitratesOptions = []

    const getSize = size => (
      parseInt(size) > 0 ? `${Math.round((parseInt(size)/8)/100000)} MB` : ''
    )

    const { track, language, download } = this.props
      
    // audio
    for ( let i = track.mediaFiles.length - 1; i >= 0; i-- ) {
      bitratesIndex.push(track.mediaFiles[i])
      bitratesOptions.push(`${track.mediaFiles[i].bitrate} kbps ${getSize(track.mediaFiles[i].filesize)}`)
    }
    
    // video
    if ( track.videoFiles.length ) {
      bitratesIndex.push(track.videoFiles[0])
      bitratesOptions.push(`MP4 ${getSize(json_data.videoFiles[0].filesize)}`)
    }
    
    bitratesOptions.push(I18n.t('Cancel', {locale: language}))

    ActionSheet.showActionSheetWithOptions({
      title: I18n.t('Select_a_bitrate_to_download', {locale: language}),
      options: bitratesOptions,
      cancelButtonIndex: bitratesOptions.length - 1,
    }, buttonIndex => {
      console.log('buttonIndex', buttonIndex, typeof buttonIndex)
      if (buttonIndex !== bitratesOptions.length - 1) {
        download(
          track,
          Dirs.presentations,
          bitratesIndex[buttonIndex].downloadURL,
          bitratesIndex[buttonIndex].filename,
          bitratesIndex[buttonIndex].bitrate,
        )
      }
    })
  }

  handleDownload = () => {
    const { track, download } = this.props
    if ( track.mediaType == MediaTypes.sermon ) {
      this._downloadSermon()
    } else if ( track.mediaType == MediaTypes.book ) {
      const mediaFile = track.mediaFiles[0]
      download(
        track,
        Dirs.audiobooks,
        mediaFile.downloadURL,
        mediaFile.filename,
        mediaFile.bitrate,
      )
    } else if ( track.mediaType == MediaTypes.bible ) {
      download(
        track,
        Dirs.bible,
        track.url,
        track.fileName,
        ''
      )
    }
  }

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
        <PlayerContent data={track} language={language} />
        <PlayerOptions onDownload={this.handleDownload} rate={rate} onSetRate={setRate} />
        <View style={styles.bottomContainer}>
          <ProgressBar />
          <PlayerControls state={state} playPause={playPause} skipToPrevious={skipToPrevious} skipToNext={skipToNext} replay={replay} forward={forward} />
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

Player.propTypes = {
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
  setRate: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired
}

export default Player
