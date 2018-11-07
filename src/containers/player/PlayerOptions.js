import React from 'react'
import PropTypes from 'prop-types'
import { View, Platform, Text, Share, StyleSheet } from 'react-native'

import IconButton from 'src/components/buttons/IconButton'
import { removeFavorite } from '../../actions';
import { MediaTypes } from 'src/constants'
import I18n from 'locales'

const PlayerOptions = ({ track, onDownload, rate, onSetRate, isFavorite, onAddFavorite, onRemoveFavorite, onPlayVideo, onAddToPlaylist }) => {
  const handleOnPressFavorite = () => {
    if (!isFavorite) {
      onAddFavorite(track)
    } else {
      onRemoveFavorite(track.id)
    }
  }
  return (
    <View style={styles.container}>
      <IconButton
        name="download"
        iconStyle={styles.icon}
        onPress={onDownload} />
      { track.mediaType === MediaTypes.sermon && 
        <IconButton
          name="heart"
          iconStyle={[styles.icon, {color: isFavorite ? '#E53935' : '#FFFFFF'}]}
          onPress={handleOnPressFavorite} />
      }
      { track.videoFiles && track.videoFiles.length > 0 &&
        <IconButton
          name="video"
          iconStyle={styles.icon}
          onPress={onPlayVideo} />
      }
      <Text
        style={[styles.icon, styles.text]}
        onPress={onSetRate}>{`${rate}X`}</Text>
      { track.mediaType === MediaTypes.sermon && 
        <IconButton
          name="folder"
          iconStyle={styles.icon}
          onPress={onAddToPlaylist} />
      }
      { (track.mediaType === MediaTypes.sermon || track.mediaType === MediaTypes.book) && 
        <IconButton
        name="share-2"
        iconStyle={styles.icon}
        onPress={() => {
          Share.share({ message: `${I18n.t("share_this_blessing_with_you.")} ${track.shareUrl}` }) 
        }} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  icon: {
    paddingHorizontal: 15,
    fontSize: 24,
    color: '#FFFFFF'
  },
  text: {
    fontSize: 20,
    width: 86,
    textAlign: 'center'
  }
})

PlayerOptions.propTypes = {
  track: PropTypes.object,
  onDownload: PropTypes.func.isRequired,
  rate: PropTypes.number,
  onSetRate: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
  onAddFavorite: PropTypes.func,
  onRemoveFavorite: PropTypes.func,
  onPlayVideo: PropTypes.func,
  onAddToPlaylist: PropTypes.func
}

export default PlayerOptions
