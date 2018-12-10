import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet
} from 'react-native'
import TextTicker from 'react-native-text-ticker'

const Slide = ({ image, header, subtitle, onPress }) => (
  <View style={styles.container}>
    <Image
      source={image && image.toString().startsWith('http') ? {uri: image} : image}
      style={styles.image}
    />
    <TouchableOpacity style={styles.center} onPress={onPress}>
      <TextTicker style={styles.title}>{header}</TextTicker>
      <TextTicker style={styles.subtitle}>{subtitle}</TextTicker>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  center: {
    alignItems: 'center'
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 64
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10
  },
  subtitle: {
    fontSize: 18
  }
})

Slide.propTypes = {
  image: PropTypes.any.isRequired,
  header: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onPress: PropTypes.func
}

export default Slide
