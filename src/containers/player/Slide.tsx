import React from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
import MarqueeText from 'react-native-marquee'

interface Props {
  image: any
  header: string
  subtitle: string
  onPress: () => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  center: {
    alignItems: 'center',
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
  },
})

const Slide: React.FC<Props> = ({ image, header, subtitle, onPress }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image && image.toString().startsWith('http') ? {uri: image} : image}
        style={styles.image}
      />
      <TouchableOpacity style={styles.center} onPress={onPress}>
        <MarqueeText marqueeOnStart duration={3500} loop style={styles.title}>{header}</MarqueeText>
        <MarqueeText marqueeOnStart duration={3500} loop style={styles.subtitle}>{subtitle}</MarqueeText>
      </TouchableOpacity>
    </View>
  )
}

export default Slide
