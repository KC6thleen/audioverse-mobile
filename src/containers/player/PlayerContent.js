import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Swiper from 'react-native-swiper'
import MarqueeText from 'react-native-marquee'

import I18n from 'locales'
import { MediaTypes } from 'src/constants'
import defaultImage from 'assets/av-logo.png'
import Slide from './Slide'

const getSlides = (data, language) => {

  const slides = []

  // description
	if (data.description) {
    slides.push({
      type: 'description',
      description: data.description
    })
	}

  // presenter
  const presenter = {
    type: 'presenter',
    image: data.artwork,
    title: data.artist,
    subtitle: ''
  }

  if ( data.mediaType === MediaTypes.sermon && data.presenters && data.presenters.length === 1 ) {
    presenter.route = 'Presenter'
    presenter.params = {
      url: data.presenters[0].recordingsURI,
      title: data.artist,
      description: data.presenters[0].description
    }
  }

  slides.push(presenter)
	
	// conference
	// don't show conference for books/stories
	if (data.mediaType != MediaTypes.book && data.conference && data.conference.length) {
		image = data.conference[0].logo != '' ? data.conference[0].photo86 : defaultImage
		slides.push({
      type: 'conference',
      image: image,
      title: data.conference[0].title,
      route: 'Conference',
      params: {
        url: data.conference[0].recordingsURI,
        title: data.conference[0].title
      }
    })
	}
	
	// series
	if (data.series && data.series.length) {
		image = data.series[0].logo != '' ? data.series[0].photo86 : defaultImage
		slides.push({
      type: 'serie',
      image: image,
      title: data.series[0].title,
      route: 'Serie',
      params: {
        url: data.series[0].recordingsURI,
        title: data.series[0].title
      }
    })
	}
	
	return slides
}

const PlayerContent = ({ data, language, navigation }) => {

  const slides = getSlides(data, language)
  const recordingDate = (!data.recordingDate || data.recordingDate == '0000-00-00 00:00:00') ? '' : I18n.t('Recorded', {locale: language}) + ' ' + data.recordingDate
  let sponsor = null
  if (data.sponsor && data.sponsor.length) {
    sponsor = {...data.sponsor[0]}
    sponsor.image = sponsor.logo != '' ? sponsor.photo86 : defaultImage
  }

  const handleOnPressSponsor = () => {
    navigation.navigate({ routeName: 'Sponsor', params: { url: sponsor.recordingsURI, title: sponsor.title } })
  }

  const handleOnPressSlide = (slide) => {
    if (slide.route) {
      navigation.navigate({ routeName: slide.route, params: slide.params })
    }
  }

  return (
    <View style={styles.container}>
      {sponsor && (
        <View style={styles.content}>
          <TouchableOpacity style={styles.metadata} onPress={handleOnPressSponsor}>
            <Image
              source={sponsor.image.toString().startsWith('http') ? {uri: sponsor.image} : sponsor.image}
              style={styles.image}
            />
            <View style={styles.info}>
              <MarqueeText marqueeOnStart loop style={styles.title}>{sponsor.title}</MarqueeText>
              <Text style={styles.subtitle} ellipsizeMode={'tail'} numberOfLines={1}>{recordingDate}</Text>
              <Text style={styles.subtitle} ellipsizeMode={'tail'} numberOfLines={1}>{sponsor.location}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <Swiper
        activeDotColor="#FFF"
        removeClippedSubviews={false}
        loop={false}>
        {slides.map(slide => {
          if (slide.type === 'description') {
            return (
              <ScrollView style={styles.descriptionContainer} contentContainerStyle={styles.descriptionContentContainer} key={slide.type}>
                <Text style={styles.descriptionTitle}>{I18n.t('Description', {locale: language})}</Text>
                <Text style={styles.description}>{slide.description}</Text>
              </ScrollView>
            )
          } else {
            return <Slide
              key={slide.type}
              image={slide.image}
              header={slide.title}
              subtitle={slide.subtitle}
              description={slide.description}
              onPress={() => { handleOnPressSlide(slide) }} />
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
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  description: {
    fontSize: 18,
    textAlign: 'center'
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

PlayerContent.propTypes = {
  data: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
}

export default PlayerContent
