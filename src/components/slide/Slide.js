import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native'

const Slide = ({ image, header, subtitle }) => (
  <TouchableOpacity style={styles.container}>
    <Image
      source={image.toString().startsWith('http') ? {uri: image} : image}
      style={styles.image}
    />
    <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={1}>{header}</Text>
    <Text style={styles.subtitle} ellipsizeMode={'tail'} numberOfLines={1}>{subtitle}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  image: {
    width: 128,
    height: 128
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
  subtitle: PropTypes.string
}

export default Slide
