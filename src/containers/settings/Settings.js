import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Switch,
  Alert,
  StyleSheet
} from 'react-native'
import ActionSheet from 'react-native-action-sheet'

import I18n from 'locales'
import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'

class Settings extends PureComponent {

  showLanguages = () => {
    const { language, actions } = this.props

    const options = Object.keys(I18n.translations).map(el => I18n.translations[el].id)

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
    const { language, autoPlay, user } = this.props

    return (
      <View style={styles.container}>
        <View>
          <ListItem icon={{name: 'pocket'}} title={I18n.t(user ? 'Logout' : 'Login', {locale: language})} chevron onPress={this.handleLoginLogout} />
          <ListItem icon={{name: 'map-pin'}} title={I18n.t('Language', {locale: language})} subtitle={I18n.t('id', {locale: language})} chevron onPress={this.showLanguages} />
          <ListItem icon={{name: 'play-circle'}} title={I18n.t('Autoplay', {locale: language})} rightElement={<Switch value={autoPlay} onValueChange={this.setAutoPlay} />} onPress={this.showLanguages} />
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
  autoPlay: PropTypes.bool.isRequired,
  user: PropTypes.object,
  actions: PropTypes.shape({
    changeLanguage: PropTypes.func.isRequired,
    setAutoPlay: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired
  })
}

export default Settings
