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
import ActionSheet from 'react-native-action-sheet'

import IconButton from 'src/components/buttons/IconButton'
import { removeFavorite } from '../../actions';
import { ContentTypes, Bitrates } from 'src/constants'
import I18n from 'locales'

const PlayerOptions = ({
  navigation,
  track,
  onDownload,
  rate,
  user,
  isFavorite,
  onSetRate,
  onAddFavorite,
  onRemoveFavorite,
  onPlayVideo,
  onSetBitRateAndReset}) => {

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

  const handleStreamingQuality = () => {
    const options = [...Bitrates]
    options.push(I18n.t('Cancel'))

    ActionSheet.showActionSheetWithOptions({
      title: I18n.t('streaming_quality'),
      options: options,
      cancelButtonIndex: options.length - 1,
    }, buttonIndex => {
      if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
        onSetBitRateAndReset(options[buttonIndex])
      }
    })
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
          onPress={onDownload}
          accessibilityLabel={I18n.t("download_file")} />
      }
      { track.contentType === ContentTypes.sermon && 
        <IconButton
          name="heart"
          iconStyle={[styles.icon, {color: isFavorite ? '#E53935' : '#FFFFFF'}]}
          onPress={handlePressFavorite}
          accessibilityLabel={I18n.t("add_to_favorites")} />
      }
      { track.videoFiles && track.videoFiles.length > 0 &&
        <IconButton
          name="video"
          iconStyle={styles.icon}
          onPress={onPlayVideo}
          accessibilityLabel={I18n.t("play_video")} />
      }
      <Text
        style={[styles.icon, styles.text]}
        onPress={onSetRate}
        accessibilityLabel={I18n.t("select_speed")}>
        {`${rate}X`}
      </Text>
      { track.mediaFiles && track.mediaFiles.length > 1 && 
        <IconButton
          name="trending-down"
          iconStyle={styles.icon}
          onPress={handleStreamingQuality}
          accessibilityLabel={I18n.t("streaming_quality")} />
      }
      { track.contentType === ContentTypes.sermon && 
        <IconButton
          name="folder"
          iconStyle={styles.icon}
          onPress={handleAddToPlaylist}
          accessibilityLabel={I18n.t("add_to_playlists")} />
      }
      { (track.contentType === ContentTypes.sermon || track.contentType === ContentTypes.book) && 
        <IconButton
        name="share-2"
        iconStyle={styles.icon}
        onPress={handleShare}
        accessibilityLabel={I18n.t("share")} />
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
  onPlayVideo: PropTypes.func,
  onSetBitRateAndReset: PropTypes.func,
}

export default PlayerOptions
