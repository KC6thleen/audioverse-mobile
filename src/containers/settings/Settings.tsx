import React from 'react'
import {
  View,
  Switch,
  Alert,
  StyleSheet,
} from 'react-native'
import ActionSheet from 'react-native-action-sheet'
import { ListItem } from 'react-native-elements'
import { NavigationInjectedProps } from 'react-navigation'

import { UserState } from '../../store/user/types'
import I18n from '../../../locales'
import { Bitrates } from '../../constants'
import {
  changeLanguage,
  setAutoPlay,
  logOut,
  changeBitRate,
} from '../../store/settings/actions'

interface Translation {
  [key: string]: any
}

interface Props extends NavigationInjectedProps {
  language: string
  bitRate: string
  autoPlay: boolean
  user: UserState
  actions: {
    changeLanguage: typeof changeLanguage
    setAutoPlay: typeof setAutoPlay
    logOut: typeof logOut
    changeBitRate: typeof changeBitRate
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const Settings: React.FC<Props> = ({
  navigation,
  language,
  bitRate,
  autoPlay,
  user,
  actions
}) => {

  const showLanguages = () => {

    const options = Object.keys(I18n.translations).map(el => {
      const current: Translation = I18n.translations[el]
      return current.id
    })
    options.push(I18n.t('Cancel'))

    ActionSheet.showActionSheetWithOptions({
      title: I18n.t('Language', {locale: language}),
      options: options,
      cancelButtonIndex: options.length - 1,
    }, buttonIndex => {
      if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
        actions.changeLanguage(
          Object.keys(I18n.translations).find(el => {
            const current: Translation = I18n.translations[el]
            return current.id === options[buttonIndex]
          }) || ''
        )
      }
    })
  }

  const showBitrates = () => {

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

  const setAutoPlay = (value: boolean) => {
    actions.setAutoPlay(value)
  }

  const handleLoginLogout = () => {
    if (user) {
      Alert.alert(
        I18n.t('Are_you_sure'),
        '',
        [
          {text: I18n.t('Cancel'), onPress: () => {}, style: 'cancel'},
          {text: I18n.t('Yes'), onPress: actions.logOut}
        ]
      )
    } else {
      navigation.navigate('Login')
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <ListItem
          leftIcon={{type: 'feather', name: 'pocket'}}
          title={I18n.t(user ? 'Logout' : 'Login', {locale: language})}
          chevron
          bottomDivider
          onPress={handleLoginLogout} />
        <ListItem
          leftIcon={{type: 'feather', name: 'map-pin'}}
          title={I18n.t('Language', {locale: language})}
          subtitle={I18n.t('id', {locale: language})}
          chevron
          bottomDivider
          onPress={showLanguages} />
        <ListItem
          leftIcon={{type: 'feather', name: 'play-circle'}}
          title={I18n.t('Autoplay', {locale: language})}
          rightElement={<Switch value={autoPlay}
          onValueChange={setAutoPlay} />}
          bottomDivider
          onPress={showLanguages} />
        <ListItem
          leftIcon={{type: 'feather', name: 'trending-down'}}
          title={I18n.t('streaming_quality',
          {locale: language})}
          rightTitle={bitRate}
          chevron
          bottomDivider
          onPress={showBitrates} />
      </View>
    </View>
  )

}

export default Settings
