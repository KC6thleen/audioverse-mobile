import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Share,
  Alert,
  StyleSheet
} from 'react-native'
import firebase from 'react-native-firebase'
import throttle from 'lodash.throttle'

import IconButton from 'src/components/buttons/IconButton'
import { removeFavorite } from '../../actions';
import { ContentTypes } from 'src/constants'
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

  const throttledOnAddFavorite = throttle(onAddFavorite, 5000, { 'trailing': false })
  const throttledOnRemoveFavorite = throttle(onRemoveFavorite, 5000, { 'trailing': false })

  const handlePressFavorite = () => {
    if (user) {
      if (!isFavorite) {
        throttledOnAddFavorite(track)
      } else {
        throttledOnRemoveFavorite(track.id)
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

  const handleShare = () => {
    // firebase analytics
    firebase.analytics().logEvent('share', {
      content_type: Object.keys(ContentTypes).find(key => ContentTypes[key] === track.contentType),
      item_id: track.id
    })
    // share
    Share.share({ message: `${I18n.t("share_this_blessing_with_you.")} ${track.shareUrl}` })
  }

  return (
    <View style={styles.container}>
      { (!track.downloadDisabled || track.downloadDisabled === "0") &&
        track.contentType === ContentTypes.sermon && 
        <IconButton
          name="download"
          iconStyle={styles.icon}
          onPress={onDownload} />
      }
      { track.contentType === ContentTypes.sermon && 
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
      { track.contentType === ContentTypes.sermon && 
        <IconButton
          name="folder"
          iconStyle={styles.icon}
          onPress={handleAddToPlaylist} />
      }
      { (track.contentType === ContentTypes.sermon || track.contentType === ContentTypes.book) && 
        <IconButton
        name="share-2"
        iconStyle={styles.icon}
        onPress={handleShare} />
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
