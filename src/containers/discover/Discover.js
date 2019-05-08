import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import I18n from 'locales'
import InViewPort from './InViewPort'
import SliderEntry from './SliderEntry'
import Entry from './Entry'
import { sliderWidth, itemWidth } from './SliderEntry'
import { fetchData } from "src/services"
import { Endpoints, ContentTypes } from "src/constants"
import { parseRecording } from 'src/utils'

class Discover extends PureComponent {
  
  state = {
    sliderActiveSlide: 0,
    posts: [],
    wasStoriesVisible: false,
    stories: [],
    wasSongsVisible: false,
    songs: [],
    loading: true,
  }

  async componentDidMount () {
    const { result } = await fetchData(`${Endpoints.postsFeatured}`)
    if (result.length) {
      this.setState({
        posts: result.map(el => ({
          ...el.posts,
          url: el.uri,
        })),
        loading: false,
      })
    } else {
      this.setState({loading: false})
    }
  }

  loadStories = async isVisible => {
    if (!this.state.wasStoriesVisible && isVisible) {
      this.setState({ wasStoriesVisible: true })
      const { result } = await fetchData(
        `${Endpoints.presentationsByContentType}/${ContentTypes.story}?random`
      )
      if (result.length) {
        this.setState({
          stories: result.map(el => parseRecording(el.recordings))
        })
      }
    }
  }

  loadSongs = async isVisible => {
    if (!this.state.wasSongsVisible && isVisible) {
      this.setState({ wasSongsVisible: true })
      const { result } = await fetchData(
        `${Endpoints.presentationsByContentType}/${ContentTypes.scriptureSong}?random`
      )
      if (result.length) {
        this.setState({
          songs: result.map(el => parseRecording(el.recordings))
        })
      }
    }
  }

  renderList(data, title) {
    if (!data.length) return null
    return (
      <View style={styles.listContainer}>
        <Text
          numberOfLines={1}
          style={styles.listTitle}>
          {I18n.t(title)}
        </Text>
        <FlatList
          horizontal={true}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  renderItem = ({ item }) => {
    const artwork = typeof item.artwork === 'string' || item.contentType === ContentTypes.sermon
      ? item.artwork : undefined
    const text = artwork ? '' : item.title.split('-')
    const data = {
      title: item.title,
      illustration: artwork,
      illustrationText: text.length > 1 ? text[1].trim() : item.title,
    }

    return (
      <Entry
        data={data}
        onPress={() => this.props.actions.resetAndPlayTrack([item])} />
    )
  }

  renderItemWithParallax = ({item}) => {
    const data = {
      illustration: item.image,
    }
    return (
      <SliderEntry
        data={data}
        onPress={() => this.props.navigation.navigate({ routeName: 'Post', params: {url: item.url} })}
      />
    )
  }

  render() {

    return (
      <View style={styles.container}>
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}>
            <Carousel
              ref={c => this._slider1Ref = c}
              data={this.state.posts}
              renderItem={this.renderItemWithParallax}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages={true}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              inactiveSlideShift={20}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              loop={true}
              loopClonesPerSide={2}
              autoplay={true}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => this.setState({ sliderActiveSlide: index }) }
            />
            <Pagination
              dotsLength={this.state.posts.length}
              activeDotIndex={this.state.sliderActiveSlide}
              containerStyle={styles.paginationContainer}
              dotColor={'rgba(255, 255, 255, 0.92)'}
              dotStyle={styles.paginationDot}
              inactiveDotColor="#1a1917"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this._slider1Ref}
              tappableDots={!!this._slider1Ref}
            />
            {this.renderList(this.props.history, 'history')}
            <InViewPort
              disabled={!this.props.navigation.isFocused() || this.state.wasStoriesVisible}
              onChange={this.loadStories}>
              {this.renderList(this.state.stories, 'stories')}
            </InViewPort>
            <InViewPort
              disabled={!this.props.navigation.isFocused() || this.state.wasSongsVisible}
              onChange={this.loadSongs}>
              {this.renderList(this.state.songs, 'Scripture_Songs')}
            </InViewPort>
          </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  scrollview: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: 'white',
    paddingVertical: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: '#9E9E9E',
  },
  listTitle: {
    color: '#1A1917',
    fontSize: 26,
    marginLeft: 10,
    marginVertical: 10,
    letterSpacing: 0.5,
  },
})

Discover.propTypes = {
  history: PropTypes.array.isRequired,
}

export default Discover
