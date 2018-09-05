import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

const Signup = ({ navigation }) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text onPress={() => navigation.navigate('App')}>Sign-up -> Go to App</Text>
  </View>
)

Signup.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default Signup
