import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

import randomColor from 'randomcolor'

const slideHeight = 130
const slideWidth = 130
const itemHorizontalMargin = 8
const itemVerticalMargin = 8
const itemWidth = slideWidth + itemHorizontalMargin * 2

class Entry extends Component {

  state = {
    color: this.props.data.illustration ? '' : randomColor({luminosity: 'light'})
  }

  render () {
    const { data: { title, illustration, illustrationText }, onPress } = this.props

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.innerContainer}
        onPress={onPress}>
        <View style={styles.imageContainer}>
          { illustration ? 
            <Image
              source={illustration && illustration.toString().startsWith('http') ? {uri: illustration} : illustration}
              style={styles.image} />
            :
            <View style={[styles.image, styles.illustrationTextContainer, {backgroundColor: this.state.color}]}>
              <Text style={styles.illustrationText}>{illustrationText}</Text>
            </View>
          }
        </View>
        <View style={styles.textContainer}>
          <Text
            style={styles.title}
            numberOfLines={1}>
            { title }
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    width: itemWidth,
    paddingHorizontal: itemHorizontalMargin,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: slideWidth,
    height: slideHeight,
    resizeMode: 'cover',
    borderWidth: 0.2,
    borderColor: '#9E9E9E'
  },
  textContainer: {
    justifyContent: 'center',
    paddingVertical: itemVerticalMargin,
  },
  title: {
    color: '#1a1917',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  illustrationTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationText: {
    fontSize: 24,
    color: '#4F4F4F',
    textAlign: 'center',
  },
})

Entry.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Entry
