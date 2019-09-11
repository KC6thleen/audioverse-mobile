import React, {
  useState,
  useRef,
} from 'react'
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Icon, Button } from 'react-native-elements'
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk'
import Toast from 'react-native-simple-toast'
import firebase from 'react-native-firebase'
import { NavigationScreenProps } from 'react-navigation'

import I18n from '../../../../locales'
import { Endpoints } from '../../../constants'
import * as api from '../../../services'
import logo from '../../../../assets/av-logo-red-gray.png'
import { setUser } from '../../../store/user/actions'

interface Props extends NavigationScreenProps {
  language: string
  actions: {
    setUser: typeof setUser
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9E9EF',
  },
  close: {
    zIndex: 10,
    position: 'absolute',
    left: 10,
    top: 40,
  },
  form: {
    width: 300,
  },
  logo: {
    width: undefined,
    marginBottom: 30,
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D73352',
  },
  button: {
    backgroundColor: '#D73352',
    paddingVertical: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  fb: {
    backgroundColor: '#4E64B2',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  options: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  forgotPassword: {
    color: '#337AB7',
  }
})

const Login: React.FC<Props> = ({ navigation, language, actions }) => {

  const [signin, setSignin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passwordRef: any = useRef(null)

  const navigate = () => {
    navigation.navigate('Home')
    if (navigation.state.params && navigation.state.params.screen) {
      navigation.navigate(navigation.state.params.screen)
    }
  }

  const handleClose = async () => {
    await AsyncStorage.setItem('hideLogin', "1")
    navigate()
  }

  const handleChangeTextEmail = (text: string) => {
    setEmail(text)
    setFormValid()
  }

  const handleChangeTextPassword = (text: string) => {
    setPassword(text)
    setFormValid()
  }

  const setFormValid = () => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordValidation = signin ? password !== '' : password.length >= 6
    if (reg.test(email) && passwordValidation) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }

  const handleSubmitEditingEmail = () => {
    passwordRef.current.focus()
  }

  const handleSignInUp = async () => {
    if (isFormValid) {
      if (signin) {
        signIn()
      } else {
        signUp()
      }
    }
  }

  const loginSocial = async (data: {[key:string]: any}, socialName: string) => {
    const url = `${Endpoints.loginSocial}?socialId=${data.id}&socialName=${socialName}&firstName=${data.first_name}&lastName=${data.last_name}&email=${data.email}`
    const result = await api.fetchData(url)
    if (result && result.result) {
      const user = result.result
      // set user
      actions.setUser(user)
      // firebase analytics
      firebase.analytics().setUserId(user.userId ? user.userId.toString() : null)
      firebase.analytics().logEvent('login', { sign_up_method: 'email' })
      // navigate to the main screen
      navigate()
    }
  }

  const handleLoginWithFB = async () => {
    try {
      LoginManager.logOut()
      const result = await LoginManager.logInWithPermissions(["public_profile"])
      if (!result.isCancelled) {
        const infoRequest = new GraphRequest(
          '/me',
          { parameters: { fields: { string: 'name,email,first_name,last_name' } } },
          (error, result) => {
            if (error) {
              console.log('Error fetching data: ' + error.toString())
            } else {
              console.log('Success fetching data: ',  result)
              loginSocial(result || {}, 'Facebook')
            }
          },
        )
        // Start the graph request
        new GraphRequestManager().addRequest(infoRequest).start()
      }
    } catch (err) {
      Toast.show(err)
    }
  }

  const signIn = async () => {
    setLoading(true)
    const url = `${Endpoints.login}?email=${email}&password=${encodeURIComponent(password)}`
    try {
      const response = await api.signIn(url)
      setLoading(false)
      if (response.data) {
        const user = response.data
        // set user
        actions.setUser(user)
        // firebase analytics
        firebase.analytics().setUserId(user.userId ? user.userId.toString() : null)
        firebase.analytics().logEvent('login', { sign_up_method: 'email' })
        // navigate to the main screen
        navigate()
      } else {
        Alert.alert(I18n.t('Invalid_username_or_password.'))
      }
    } catch(e) {
      console.log(e)
      setLoading(false)
    }
  }

  const signUp = async () => {
    setLoading(true)
    const url = `${Endpoints.signup}?email=${email}&password=${encodeURIComponent(password)}&password_confirmation=${encodeURIComponent(password)}&language=${language}`
    try {
      const response = await api.signUp(url)
      setLoading(false)
      if (response.data) {
        // firebase analytics
        firebase.analytics().logEvent('sign_up', { sign_up_method: 'email' })
        // alert user
        Alert.alert(I18n.t('Account_created._Please_check_your_email_to_activate_it.'))
        setSignin(true)
      } else {
        Alert.alert(I18n.t('Email_exists.'))
      }
    } catch(e) {
      console.log(e)
      setLoading(false)
    }
  }

  const handleCreateAccount = () => {
    setSignin(!signin)
    setFormValid()
  }

  const handleForgotPassword = () => {
    Linking.openURL(`https://www.audioverse.org/${language}/registrar/help`).catch(err => console.error(err))
  }

  
  return (
    <View style={styles.container}>
      <Button
        icon={{
          type: 'feather',
          name: 'x-circle',
          size: 30,
        }}
        type="clear"
        containerStyle={styles.close}
        onPress={handleClose} />
      <View style={styles.form}>
        <Image
          source={logo}
          style={styles.logo}
          resizeMode="contain" />
        <View style={styles.inputWrap}>
          <View style={styles.iconWrap}>
            <Icon type="feather" name="user" size={20} color="#FFF" />
          </View>
          <TextInput
            placeholder={I18n.t('Email')}
            value={email}
            onChangeText={handleChangeTextEmail}
            autoCapitalize="none"
            style={styles.input}
            underlineColorAndroid="transparent"
            keyboardType="email-address"
            onSubmitEditing={handleSubmitEditingEmail}
          />
        </View>
        <View style={styles.inputWrap}>
          <View style={styles.iconWrap}>
            <Icon type="feather" name="lock" size={20} color="#FFF" />
          </View>
          <TextInput
            placeholder={I18n.t('Password')}
            value={password}
            onChangeText={handleChangeTextPassword}
            style={styles.input}
            underlineColorAndroid="transparent"
            ref={passwordRef}
            onSubmitEditing={handleSignInUp}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          activeOpacity={isFormValid ? 1 : .5}
          onPress={handleSignInUp}>
          <View style={[styles.button, !isFormValid ? styles.buttonDisabled : {}]}>
            { !loading &&
              <Text
                style={styles.buttonText}>
                {I18n.t(signin ? 'Sign_in' : 'Sign_up')}
              </Text>
            }
            { loading &&
              <ActivityIndicator color="#FFF" />
            }
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.5} onPress={handleLoginWithFB}>
          <View style={[styles.button, styles.fb]}>
            <Text style={styles.buttonText}>{I18n.t(signin ? 'Sign_in_with_facebook' : 'Sign_up_with_facebook')}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity activeOpacity={.5} onPress={handleCreateAccount}>
            <Text>{I18n.t(signin ? 'Create_account' : 'Sign_in')}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.5}  onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>{I18n.t('Forgot_your_password')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

}

export default Login
