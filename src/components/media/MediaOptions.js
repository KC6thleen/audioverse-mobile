import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const MediaOptions = ({ rate, onSetRate }) => (
  <View style={styles.container}>
    <Icon name="download" style={styles.icon} onPress={() => {}} />
    <Icon name="star" style={styles.icon} onPress={() => {}} />
    <Icon name="video" style={styles.icon} onPress={() => {}} />
    <Text style={[styles.icon, {fontSize: 20, width: 84, textAlign: 'center'}]} onPress={onSetRate}>{rate + 'X'}</Text>
    <Icon name="cast" style={styles.icon} onPress={() => {}} />
    <Icon name="folder" style={styles.icon} onPress={() => {}} />
    <Icon name="share-2" style={styles.icon} onPress={() => {}} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  icon: {
    paddingHorizontal: 15,
    fontSize: 24,
    color: '#FFFFFF'
  }
})

MediaOptions.propTypes = {
  rate: PropTypes.number,
  onSetRate: PropTypes.func.isRequired
}

export default MediaOptions
