import React from 'react'
import PropTypes from 'prop-types'
import { View, Platform, Text, StyleSheet } from 'react-native'

import IconButton from 'src/components/buttons/IconButton'
import { removeFavorite } from '../../actions';
import { MediaTypes } from 'src/constants'

const PlayerOptions = ({ track, onDownload, rate, onSetRate, isFavorite, onAddFavorite, onRemoveFavorite, onAddToPlaylist }) => {
  const handleOnPressFavorite = () => {
    if (!isFavorite) {
      onAddFavorite(track)
    } else {
      onRemoveFavorite(track.id)
    }
  }
  return (
    <View style={styles.container}>
      <IconButton name="download" iconStyle={styles.icon} onPress={onDownload} />
      { Platform.OS === 'Android' && 
        <IconButton name="cast" iconStyle={styles.icon} onPress={() => {}} />
      }
      { track.mediaType === MediaTypes.sermon && 
        <IconButton name="heart" iconStyle={[styles.icon, {color: isFavorite ? '#E53935' : '#FFFFFF'}]} onPress={handleOnPressFavorite} />
      }
      { track.mediaType === MediaTypes.sermon && 
        <IconButton name="video" iconStyle={styles.icon} onPress={() => {}} />
      }
      { track.mediaType === MediaTypes.sermon && 
        <Text style={[styles.icon, {fontSize: 20, width: 86, textAlign: 'center'}]} onPress={onSetRate}>{`${rate}X`}</Text>
      }
      { track.mediaType === MediaTypes.sermon && 
        <IconButton name="folder" iconStyle={styles.icon} onPress={onAddToPlaylist} />
      }
      { (track.mediaType === MediaTypes.sermon || track.mediaType === MediaTypes.book) && 
        <IconButton name="share-2" iconStyle={styles.icon} onPress={() => {}} />
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
  onAddToPlaylist: PropTypes.func
}

export default PlayerOptions
