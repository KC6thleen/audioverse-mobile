import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Switch,
  Alert,
  StyleSheet
} from 'react-native'
import ActionSheet from 'react-native-action-sheet'
import { ListItem } from 'react-native-elements'

import I18n from 'locales'
import MiniPlayer from 'src/components/miniplayer'
import { Bitrates } from 'src/constants'

class Settings extends PureComponent {

  showLanguages = () => {
    const { language, actions } = this.props

    const options = Object.keys(I18n.translations).map(el => I18n.translations[el].id)
    options.push(I18n.t('Cancel'))

    ActionSheet.showActionSheetWithOptions({
      title: I18n.t('Language', {locale: language}),
      options: options,
      cancelButtonIndex: options.length - 1,
    }, buttonIndex => {
      if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
        actions.changeLanguage(Object.keys(I18n.translations).find(el => I18n.translations[el].id === options[buttonIndex]))
      }
    })
  }

  showBitrates = () => {
    const { language, actions } = this.props

    const options = [...Bitrates]
    options.push(I18n.t('Cancel'))

    ActionSheet.showActionSheetWithOptions({
      title: I18n.t('streaming_quality', {locale: language}),
      options: options,
      cancelButtonIndex: options.length - 1,
    }, buttonIndex => {
      if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
        actions.changeBitRate(options[buttonIndex])
      }
    })
  }

  setAutoPlay = value => {
    this.props.actions.setAutoPlay(value)
  }

  handleLoginLogout = () => {
    if (this.props.user) {
      Alert.alert(
        I18n.t('Are_you_sure'),
        '',
        [
          {text: I18n.t('Cancel'), onPress: () => {}, style: 'cancel'},
          {text: I18n.t('Yes'), onPress: this.props.actions.logOut}
        ]
      )
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    const { language, bitRate, autoPlay, user } = this.props

    return (
      <View style={styles.container}>
        <View>
          <ListItem
            leftIcon={{type: 'feather', name: 'pocket'}}
            title={I18n.t(user ? 'Logout' : 'Login', {locale: language})}
            chevron
            bottomDivider
            onPress={this.handleLoginLogout} />
          <ListItem
            leftIcon={{type: 'feather', name: 'map-pin'}}
            title={I18n.t('Language', {locale: language})}
            subtitle={I18n.t('id', {locale: language})}
            chevron
            bottomDivider
            onPress={this.showLanguages} />
          <ListItem
            leftIcon={{type: 'feather', name: 'play-circle'}}
            title={I18n.t('Autoplay', {locale: language})}
            rightElement={<Switch value={autoPlay}
            onValueChange={this.setAutoPlay} />}
            bottomDivider
            onPress={this.showLanguages} />
          <ListItem
            leftIcon={{type: 'feather', name: 'trending-down'}}
            title={I18n.t('streaming_quality',
            {locale: language})}
            rightTitle={bitRate}
            chevron
            bottomDivider
            onPress={this.showBitrates} />
        </View>
        <MiniPlayer navigation={this.props.navigation} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
})

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  bitRate: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  user: PropTypes.object,
  actions: PropTypes.shape({
    changeLanguage: PropTypes.func.isRequired,
    setAutoPlay: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    changeBitRate: PropTypes.func.isRequired,
  })
}

export default Settings
