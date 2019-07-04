import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import MiniPlayer from 'src/components/miniplayer'

function withPlayer(WrappedComponent) {
  class WithPlayer extends React.Component {
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    }
  })
  
  WithPlayer.propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  return WithPlayer
}

export default withPlayer
