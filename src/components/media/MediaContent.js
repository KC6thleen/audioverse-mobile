import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'

import I18n from '../../../locales'
import { MediaTypes } from '../../constants'
import defaultImage from '../../../assets/av-logo.png'
import Slide from '../slide/Slide'

const getSlides = (data, language) => {

  const slides = []

  // presenter
  slides.push({type: 'presenter', image: data.artwork, title: data.title, subtitle: data.artist})
  
  // description
	if (data.description) {
    slides.push({type: 'description', description: data.description})
	}
	
	// conference
	// don't show conference for books/stories
	if (data.mediaCategory != MediaTypes.book && data.conference && data.conference.length) {
		image = data.conference[0].logo != '' ? data.conference[0].photo86 : defaultImage
		slides.push({type: 'conference', image: image, title: data.conference[0].title})
	}
	
	// series
	if (data.series && data.series.length) {
		image = data.series[0].logo != '' ? data.series[0].photo86 : defaultImage
		slides.push({type: 'serie', image: image, title: data.series[0].title})
	}
	
	return slides
}

const MediaContent = ({ data, language }) => {

  const slides = getSlides(data, language)
  const recordingDate = (!data.recordingDate || data.recordingDate == '0000-00-00 00:00:00') ? '' : I18n.t('Recorded', {locale: language}) + ' ' + data.recordingDate
  let sponsor = null
  if (data.sponsor && data.sponsor.length) {
    sponsor = {...data.sponsor[0]}
    sponsor.image = sponsor.logo != '' ? sponsor.photo86 : defaultImage
  }

  return (
    <View style={styles.container}>
      {sponsor && (
        <View style={styles.content}>
          <TouchableOpacity style={styles.metadata}>
            <Image
              source={sponsor.image.toString().startsWith('http') ? {uri: sponsor.image} : sponsor.image}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={1}>{sponsor.title}</Text>
              <Text style={styles.subtitle} ellipsizeMode={'tail'} numberOfLines={1}>{recordingDate}</Text>
              <Text style={styles.subtitle} ellipsizeMode={'tail'} numberOfLines={1}>{sponsor.location}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Swiper activeDotColor="#FFFFFF">
        {slides.map(slide => {
          if (slide.type === 'description') {
            return (
              <ScrollView style={styles.descriptionContainer} contentContainerStyle={styles.descriptionContentContainer} key={slide.type}>
                <Text style={styles.description}>{slide.description}</Text>
              </ScrollView>
            )
          } else {
            return <Slide key={slide.type} image={slide.image} header={slide.title} subtitle={slide.subtitle} description={slide.description} />
          }
        })}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  descriptionContainer: {
    padding: 20,
    marginBottom: 50
  },
  descriptionContentContainer: {
    flexGrow: 1,
    justifyContent : 'center'
  },
  description: {
    fontSize: 18
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#CCCCCC50',
    padding: 10,
    borderRadius: 10
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  info: {
    flex: 1,
    paddingHorizontal: 10
  },
  title: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500'
  },
  subtitle: {
    color: '#212121',
    fontSize: 14,
    fontWeight: '300'
  },
})

MediaContent.propTypes = {
  data: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
}

export default MediaContent
