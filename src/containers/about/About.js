import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  Text,
  Linking,
  Share,
  FlatList,
  Platform,
  StyleSheet
} from 'react-native'
import { ListItem } from 'react-native-elements'

import packageJson from '../../../package.json'
import I18n from 'locales'
import logo from 'assets/av-logo-red-gray.png'

class Login extends PureComponent {

  handleDonate = () => {
    Linking.openURL('https://www.audioverse.org/english/about/2/donations.html').catch(err => console.error(err))
  }

  handleSubmitTestimony = () => {
    Linking.openURL(`https://www.audioverse.org/${this.props.language}/feedback/testimonial`).catch(err => console.error(err))
  }

  handleShareApp = () => {
    let url = ''
    if (Platform.OS === 'ios') {
      url = 'https://itunes.apple.com/us/app/audioverse/id726998810'
    } else {
      url = 'https://play.google.com/store/apps/details?id=org.audioverse.exodus'
    }
    Share.share({ message: url })
  }

  handleRateUs = () => {
    let url = ''
    if (Platform.OS === 'ios') {
      url = 'https://itunes.apple.com/us/app/audioverse/id726998810'
    } else {
      url = 'https://play.google.com/store/apps/details?id=org.audioverse.exodus'
    }
    Linking.openURL(url).catch(err => console.error(err))
  }

  handleGitHub = () => {
    Linking.openURL('https://github.com/avorg/audioverse-mobile').catch(err => console.error(err))
  }

  handleFacebook = () => {
    Linking.openURL('https://www.facebook.com/AudioVerse').catch(err => console.error(err))
  }

  handleInstagram = () => {
    Linking.openURL('https://www.instagram.com/audioverse').catch(err => console.error(err))
  }

  render() {
    const data = [
      {
        title: I18n.t('donate'),
        onPress: this.handleDonate
      },
      {
        title: I18n.t('submit_testimony'),
        onPress: this.handleSubmitTestimony
      },
      {
        title: I18n.t('share_app'),
        onPress: this.handleShareApp
      },
      {
        title: I18n.t('rate_us'),
        onPress: this.handleRateUs
      },
      {
        title: I18n.t('GitHub'),
        onPress: this.handleGitHub
      },
      {
        title: I18n.t('Facebook'),
        onPress: this.handleFacebook
      },
      {
        title: I18n.t('Instagram'),
        onPress: this.handleInstagram
      },
      {
        title: `${I18n.t('version')} ${packageJson.version}`
      },
    ]
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain" />
          <Text
            style={styles.support}>
            {I18n.t('support_av_text')}
          </Text>
          <FlatList
            data={data}
            keyExtractor={item => item.title}
            renderItem={
              ({item}) => 
                <ListItem
                  title={item.title}
                  onPress={item.onPress}
                  chevron={item.onPress ? true : false}
                  bottomDivider />
            }
          />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    width: 300
  },
  logo: {
    width: null
  },
  support: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40
  }
})

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
}

export default Login
