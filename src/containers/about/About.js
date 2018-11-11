import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  Share,
  Platform,
  StyleSheet
} from 'react-native'

import I18n from 'locales'
import logo from 'assets/av-logo-red-gray.png'

class Login extends PureComponent {

  handleDonate = () => {
    Linking.openURL(`https://www.audioverse.org/english/about/2/donations.html`).catch(err => console.error(err))
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

  render() {
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
          <TouchableOpacity
            activeOpacity={.5}
            onPress={this.handleDonate}>
            <View style={styles.button}>
              <Text
                style={styles.buttonText}>
                {I18n.t('donate')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.5}
            onPress={this.handleSubmitTestimony}>
            <View style={[styles.button, {backgroundColor: '#2096F3'}]}>
              <Text
                style={styles.buttonText}>
                {I18n.t('submit_testimony')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.5}
            onPress={this.handleShareApp}>
            <View style={[styles.button, {backgroundColor: '#009689'}]}>
              <Text
                style={styles.buttonText}>
                {I18n.t('share_app')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.5}
            onPress={this.handleRateUs}>
            <View style={[styles.button, {backgroundColor: '#8BC24B'}]}>
              <Text
                style={styles.buttonText}>
                {I18n.t('rate_us')}
              </Text>
            </View>
          </TouchableOpacity>
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
    width: null,
    marginBottom: 10
  },
  support: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  button: {
    backgroundColor: "#D73352",
    paddingVertical: 10,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16
  }
})

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
}

export default Login
