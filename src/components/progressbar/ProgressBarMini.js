import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ProgressComponent } from 'react-native-track-player'

class ProgressBarMini extends ProgressComponent {

  render() {
    
    return (
      <View
        style={[
          {width: (this.getProgress() * 100) + '%'},
          styles.container
        ]}
      />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    height: 2,
    backgroundColor: '#E53935'
  }
})

export default ProgressBarMini
