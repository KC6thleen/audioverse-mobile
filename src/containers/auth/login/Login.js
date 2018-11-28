import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Linking,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import I18n from 'locales'
import { Endpoints } from 'src/constants'
import logo from 'assets/av-logo-red-gray.png'

class Login extends PureComponent {

  state = {
    signin: true,
    loading: false,
    isFormValid: false,
    email: '',
    password: ''
  }

  navigate = () => {
    const { navigation } = this.props
    navigation.navigate('AppStack')
    if (navigation.state.params && navigation.state.params.screen) {
      navigation.navigate(navigation.state.params.screen)
    }
  }

  handleClose = async () => {
    await AsyncStorage.setItem('hideLogin', "1")
    this.navigate()
  }

  handleChangeTextEmail = text => {
    this.setState({email: text}, () => {
      this.setFormValid()
    })
  }

  handleChangeTextPassword = text => {
    this.setState({password: text}, () => {
      this.setFormValid()
    })
  }

  setFormValid = () => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordValidation = this.state.signin ? this.state.password !== '' : this.state.password.length >= 6
    if (reg.test(this.state.email) && passwordValidation) {
      this.setState({ isFormValid: true })
    } else {
      this.setState({ isFormValid: false })
    }
  }

  handleSubmitEditingEmail = () => {
    this.passwordRef.focus()
  }

  handleSignInUp = async () => {
    if (this.state.isFormValid) {
      if (this.state.signin) {
        this.signIn()
      } else {
        this.signUp()
      }
    }
  }

  signIn = async () => {
    this.setState({ loading: true })
    const url = `${process.env['API_URL']}${Endpoints.login}?email=${this.state.email}&password=${encodeURIComponent(this.state.password)}`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + process.env['BEARER_TOKEN']
        }
      })
      this.setState({ loading: false })
      const json = await response.json()
      if (json.data) {
        this.props.actions.setUser(json.data)
        // navigate to the main screen
        this.navigate()
      } else {
        Alert.alert(I18n.t('Invalid_username_or_password.'))
      }
    } catch(e) {
      console.log(e)
      this.setState({ loading: false })
    }
  }

  signUp = async () => {
    this.setState({ loading: true })
    const url = `${process.env['API_URL']}${Endpoints.signup}?email=${this.state.email}&password=${encodeURIComponent(this.state.password)}&password_confirmation=${encodeURIComponent(this.state.password)}&language=${this.props.language}`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + process.env['BEARER_TOKEN']
        }
      })
      this.setState({ loading: false })
      const json = await response.json()
      if (json.data) {
        Alert.alert(I18n.t('Account_created._Please_check_your_email_to_activate_it.'))
        this.setState({ signin: true })
      } else {
        Alert.alert(I18n.t('Email_exists.'))
      }
    } catch(e) {
      console.log(e)
      this.setState({ loading: false })
    }
  }

  handleCreateAccount = () => {
    this.setState({
      signin: !this.state.signin
    }, () => {
      this.setFormValid()
    })
  }

  handleForgotPassword = () => {
    Linking.openURL(`https://www.audioverse.org/${this.props.language}/registrar/help`).catch(err => console.error(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon
          name="x-circle"
          size={30}
          style={styles.close}
          onPress={this.handleClose} />
        <View style={styles.form}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain" />
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Icon name="user" size={20} color="#FFF" />
            </View>
            <TextInput
              placeholder={I18n.t('Email')}
              value={this.state.email}
              onChangeText={this.handleChangeTextEmail}
              autoCapitalize="none"
              style={styles.input}
              underlineColorAndroid="transparent"
              keyboardType="email-address"
              onSubmitEditing={this.handleSubmitEditingEmail}
            />
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Icon name="lock" size={20} color="#FFF" />
            </View>
            <TextInput
              placeholder={I18n.t('Password')}
              value={this.state.password}
              onChangeText={this.handleChangeTextPassword}
              style={styles.input}
              underlineColorAndroid="transparent"
              ref={ref => { this.passwordRef = ref }}
              onSubmitEditing={this.handleSignInUp}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            activeOpacity={this.state.isFormValid ? 1 : .5}
            onPress={this.handleSignInUp}>
            <View style={[styles.button, !this.state.isFormValid ? styles.buttonDisabled : {}]}>
              { !this.state.loading &&
                <Text
                  style={styles.buttonText}>
                  {I18n.t(this.state.signin ? 'Sign_in' : 'Sign_up')}
                </Text>
              }
              { this.state.loading &&
                <ActivityIndicator color="#FFF" />
              }
            </View>
          </TouchableOpacity>
          <View style={styles.options}>
            <TouchableOpacity activeOpacity={.5} onPress={this.handleCreateAccount}>
              <Text>{I18n.t(this.state.signin ? 'Create_account' : 'Sign_in')}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5}  onPress={this.handleForgotPassword}>
              <Text style={styles.forgotPassword}>{I18n.t('Forgot_your_password')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9E9EF'
  },
  close: {
    zIndex: 10,
    position: 'absolute',
    left: 10,
    top: 40
  },
  form: {
    width: 300
  },
  logo: {
    width: null,
    marginBottom: 30
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    backgroundColor: "transparent"
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF'
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D73352"
  },
  button: {
    backgroundColor: "#D73352",
    paddingVertical: 10,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonDisabled: {
    opacity: 0.5
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16
  },
  options: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around'
  },
  forgotPassword: {
    color: '#337AB7'
  }
})

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    setUser: PropTypes.func.isRequired
  })
}

export default Login
