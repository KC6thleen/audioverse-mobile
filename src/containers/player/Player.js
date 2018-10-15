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
import { getPresenterName, getPresenterPicture } from 'src/utils'

class Player extends PureComponent {

  downloadSermon = () => {
	
    let bitratesIndex = [], bitratesOptions = []

    const getSize = size => (
      parseInt(size) > 0 ? `${Math.round((parseInt(size)/8)/100000)} MB` : ''
    )

    const { track, language, actions } = this.props
      
    // audio
    for ( let i = track.mediaFiles.length - 1; i >= 0; i-- ) {
      bitratesIndex.push(track.mediaFiles[i])
      bitratesOptions.push(`${track.mediaFiles[i].bitrate} kbps ${getSize(track.mediaFiles[i].filesize)}`)
    }
    
    // video
    if ( track.videoFiles.length ) {
      bitratesIndex.push(track.videoFiles[0])
      bitratesOptions.push(`MP4 ${getSize(track.videoFiles[0].filesize)}`)
    }
    
    bitratesOptions.push(I18n.t('Cancel', {locale: language}))

    ActionSheet.showActionSheetWithOptions({
      title: I18n.t('Select_a_bitrate_to_download', {locale: language}),
      options: bitratesOptions,
      cancelButtonIndex: bitratesOptions.length - 1,
    }, buttonIndex => {
      if (typeof buttonIndex !== 'undefined' && buttonIndex !== bitratesOptions.length - 1) {
        actions.download(
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
    const { track, actions } = this.props
    if ( track.mediaType == MediaTypes.sermon ) {
      this.downloadSermon()
    } else if ( track.mediaType == MediaTypes.book ) {
      const mediaFile = track.mediaFiles[0]
      actions.download(
        track,
        Dirs.audiobooks,
        mediaFile.downloadURL,
        mediaFile.filename,
        mediaFile.bitrate,
      )
    } else if ( track.mediaType == MediaTypes.bible ) {
      actions.download(
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
      actions
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
            avatar={{source: getPresenterPicture(track)}}
            title={track.title}
            subtitle={getPresenterName(track)}
            rightElement={rightElement}
            style={{backgroundColor: '#E0E0E080'}}
          />
        </View>
        <PlayerContent data={track} language={language} />
        <PlayerOptions onDownload={this.handleDownload} rate={rate} onSetRate={actions.setRate} />
        <View style={styles.bottomContainer}>
          <ProgressBar />
          <PlayerControls state={state} playPause={actions.playPause} skipToPrevious={actions.skipToPrevious} skipToNext={actions.skipToNext} replay={actions.replay} forward={actions.forward} />
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
  actions: PropTypes.shape({
    playPause: PropTypes.func.isRequired,
    skipToPrevious: PropTypes.func.isRequired,
    skipToNext: PropTypes.func.isRequired,
    replay: PropTypes.func.isRequired,
    forward: PropTypes.func.isRequired,
    setRate: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired
  })
}

export default Player
