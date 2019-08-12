import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native'

import randomColor from 'randomcolor'

type ImageType = {
  uri: ImageSourcePropType
} | ImageSourcePropType

interface Props {
  data: {
    title: string
    illustration: ImageSourcePropType
    illustrationText: string
  }
  onPress: () => void
}

const slideHeight = 130
const slideWidth = 130
const itemHorizontalMargin = 8
const itemVerticalMargin = 8
const itemWidth = slideWidth + itemHorizontalMargin * 2

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

const Entry: React.FC<Props> = ({ data, onPress }) => {

  const myColor = randomColor({luminosity: 'light'}) as string

  const [color] = useState(data.illustration ? '' : myColor)

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.innerContainer}
      onPress={onPress}>
      <View style={styles.imageContainer}>
        { data.illustration ? 
          <Image
            source={data.illustration}
            style={styles.image} />
          :
          <View style={[styles.image, styles.illustrationTextContainer, {backgroundColor: color}]}>
            <Text style={styles.illustrationText}>{data.illustrationText}</Text>
          </View>
        }
      </View>
      <View style={styles.textContainer}>
        <Text
          style={styles.title}
          numberOfLines={1}>
          { data.title }
        </Text>
      </View>
    </TouchableOpacity>
  )

}

export default Entry
