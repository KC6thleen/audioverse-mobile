import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Platform, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Video from 'react-native-video'
import VideoControls from 'react-native-video-controls'

class VideoPlayer extends PureComponent {

  render() {

    return (
      <View style={styles.container}>
        { Platform.OS === 'ios' &&
          <Icon
            name="x-circle"
            color="#FFFFFF"
            size={30}
            style={styles.close}
            onPress={() => { this.props.navigation.goBack() }} />
        }
        { Platform.OS === 'ios' &&
          <Video
            source={{uri: this.props.navigation.state.params.uri}}
            controls
            // onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo}
          />
        }
        { Platform.OS === 'android' &&
          <VideoControls
            source={{uri: this.props.navigation.state.params.uri}}
            onBack={() => { this.props.navigation.goBack() }}
            style={styles.backgroundVideo}
          />
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  close: {
    zIndex: 10,
    position: 'absolute',
    left: 10,
    top: 40
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})

VideoPlayer.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default VideoPlayer
