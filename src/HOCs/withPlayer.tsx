import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import MiniPlayer from '../components/miniplayer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
})

function withPlayer(WrappedComponent: any) {
  class WithPlayer extends React.Component<NavigationScreenProps> {
    static router = WrappedComponent.router
  
    render() {
      return (
        <View style={styles.container}>
          <WrappedComponent {...this.props} />
          <MiniPlayer navigation={this.props.navigation} />
        </View>
      )
    }
  }

  return WithPlayer
}

export default withPlayer
