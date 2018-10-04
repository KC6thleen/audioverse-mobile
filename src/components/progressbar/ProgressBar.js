import React from 'react'
import { View, Text, TouchableWithoutFeedback, Slider, Platform, StyleSheet } from 'react-native'
import TrackPlayer, { ProgressComponent } from 'react-native-track-player'

import { formatTime } from 'src/utils'
import flatDot from 'assets/flat_dot.png'

class ProgressBar extends ProgressComponent {

  handleValueChange = (value) => {
    TrackPlayer.pause()
    TrackPlayer.seekTo(value)
  }

  handleSlidingComplete = () => {
    TrackPlayer.play()
  }

  render() {
    const position = formatTime(Math.floor(this.state.position))
    const duration = formatTime(Math.floor(this.state.duration))
    const info = position + ' / ' + duration

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <Slider
            value={this.state.position}
            minimumValue={0}
            maximumValue={this.state.duration}
            step={1}
            minimumTrackTintColor="#E53935"
            thumbTintColor="#E53935"
            thumbImage={flatDot}
            style={styles.slider}
            onValueChange={this.handleValueChange}
            onSlidingComplete={this.handleSlidingComplete} />
        </TouchableWithoutFeedback>
        <View style={styles.info}>
          <Text style={{marginLeft: 10}}>{position}</Text>
          <Text style={{marginRight: 10}}>{duration}</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  slider: {
    width: '100%',
    marginBottom: Platform.OS === 'ios' ? -20 : -10,
    zIndex: 10
  },
  info: {
    backgroundColor: '#E0E0E080',
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 10 : 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default ProgressBar
