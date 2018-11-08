import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet
} from 'react-native'

class LoadingScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.navigate()
  }

  navigate = async () => {
    const hideLogin = await AsyncStorage.getItem('hideLogin')
    this.props.navigation.navigate(!hideLogin ? 'Login' : 'AppDrawer')
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

LoadingScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default LoadingScreen
