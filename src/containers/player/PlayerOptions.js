import React from 'react'
import PropTypes from 'prop-types'
import { View, Platform, Text, Share, Alert, StyleSheet } from 'react-native'

import IconButton from 'src/components/buttons/IconButton'
import { removeFavorite } from '../../actions';
import { MediaTypes } from 'src/constants'
import I18n from 'locales'

const PlayerOptions = ({ navigation, track, onDownload, rate, user, isFavorite, onSetRate, onAddFavorite, onRemoveFavorite, onPlayVideo }) => {

  const logIn = () => {
    Alert.alert(
      I18n.t('Would_you_like_to_log_in'),
      '',
      [
        {text: I18n.t('Cancel'), onPress: () => {}, style: 'cancel'},
        {text: I18n.t('Yes'), onPress: () => { navigation.navigate('Login', { screen: 'Player' }) }}
      ]
    )
  }

  const handlePressFavorite = () => {
    if (user) {
      if (!isFavorite) {
        onAddFavorite(track)
      } else {
        onRemoveFavorite(track.id)
      }
    } else {
      logIn()
    }
  }

  const handleAddToPlaylist = () => {
    if (user) {
      navigation.navigate({ routeName: 'AddToPlaylist' })
    } else {
      logIn()
    }
  }

  return (
    <View style={styles.container}>
      { (!track.downloadDisabled || track.downloadDisabled === "0") &&
        track.mediaType === MediaTypes.sermon && 
        <IconButton
          name="download"
          iconStyle={styles.icon}
          onPress={onDownload} />
      }
      { track.mediaType === MediaTypes.sermon && 
        <IconButton
          name="heart"
          iconStyle={[styles.icon, {color: isFavorite ? '#E53935' : '#FFFFFF'}]}
          onPress={handlePressFavorite} />
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
          onPress={handleAddToPlaylist} />
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
  navigation: PropTypes.object.isRequired,
  track: PropTypes.object,
  rate: PropTypes.number,
  user: PropTypes.object,
  isFavorite: PropTypes.bool,
  onDownload: PropTypes.func.isRequired,
  onSetRate: PropTypes.func.isRequired,
  onAddFavorite: PropTypes.func,
  onRemoveFavorite: PropTypes.func,
  onPlayVideo: PropTypes.func
}

export default PlayerOptions
