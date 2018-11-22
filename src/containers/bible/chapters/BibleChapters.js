import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native'

import MiniPlayer from 'src/components/miniplayer'
import { parseBibleChapter } from 'src/services'

class BibleChapters extends PureComponent {

  componentDidMount() {
    if (!this.props.items.length) {
      this.props.actions.loadBibleChapters(false, false, this.props.bible.testament, this.props.bible.book)
    }
  }

  handlePressItem = item => {
    this.props.actions.bibleChapter(item.chapter_id)

    const { items, bible, actions, navigation } = this.props

    const tracks = items.map(item => parseBibleChapter(item, bible))

    const track = tracks.find(el => el.id === `${bible.version.id}_${item.book_id}_${item.chapter_id}`)

    actions.resetAndPlayTrack(tracks, track.id)
    this.props.navigation.navigate({ routeName: 'Verses' })

  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={this.handlePressItem.bind(this, item)} style={styles.item}>
        <Text style={styles.chapter}>{item.chapter_id}</Text>
      </TouchableOpacity>
    )
  }
  
  render() {
    
    const { items, pagination } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={item => item.chapter_id}
          refreshing={pagination.isFetching}
          numColumns={4}
        />
        <MiniPlayer navigation={this.props.navigation} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  item: {
    width: '25%',
    padding: 15,
    alignItems: 'center'
  },
  chapter: {
    fontSize: 18
  }
})

BibleChapters.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  bible: PropTypes.object,
  actions: PropTypes.shape({
    bibleChapter: PropTypes.func.isRequired,
    loadBibleChapters: PropTypes.func.isRequired,
    resetAndPlayTrack: PropTypes.func.isRequired
  })
}

export default BibleChapters
