import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

const Login = ({ navigation }) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text onPress={() => navigation.navigate('App')}>Log-in -> Go to App</Text>
  </View>
)

Login.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default Login
