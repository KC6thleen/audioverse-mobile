import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Dimensions,
  Platform,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Video from 'react-native-video'
import VideoControls from 'react-native-video-controls'

class VideoPlayer extends PureComponent {

  state = {
    paddingTop: 0
  }

  onLayout(e) {
    const {width, height} = Dimensions.get('window')
    if (Platform.OS === 'ios' && height > width) { // on iOS when is in portrait mode
      this.setState({ paddingTop: 12 })
    } else {
      this.setState({ paddingTop: 0 })
    }
  }

  render() {

    return (
      <View style={[styles.container, { paddingTop: this.state.paddingTop }]} onLayout={this.onLayout.bind(this)}>
        <VideoControls
          source={{uri: this.props.navigation.state.params.uri}}
          onBack={() => { this.props.navigation.goBack() }}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
})

VideoPlayer.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default VideoPlayer
