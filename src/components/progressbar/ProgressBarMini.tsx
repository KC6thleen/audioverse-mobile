import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useProgress } from 'react-native-track-player'

const styles = StyleSheet.create({
  container: {
    height: 2,
    backgroundColor: '#E53935',
  },
})

const ProgressBarMini: React.FC<{}> = () => {
  const progress = useProgress()

  return (
    <View
      style={[
        {width: (progress.duration > 0 ? (progress.position / progress.duration * 100) : 0) + '%'},
        styles.container
      ]}
    />
  )

}

export default ProgressBarMini
