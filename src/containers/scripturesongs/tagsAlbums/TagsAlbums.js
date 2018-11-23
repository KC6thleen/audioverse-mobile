import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'

class TagsAlbums extends PureComponent {

  componentDidMount() {
    this.props.actions.loadTagsAlbums()
  }

  handleEndReached = () => {
    this.props.actions.loadTagsAlbums(true, false)
  }

  handleRefresh = () => {
    this.props.actions.loadTagsAlbums(false, true)
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        avatar={{source: item.photo86}}
        title={item.title}
        onPress={() => this.props.navigation.navigate({ routeName: 'TagAlbum', params: { url: item.recordingsURI, title: item.title } })}
      />
    )
  }

  render() {
    const { items, pagination } = this.props

    return (
      <View style={styles.container}>
        <List renderItem={this.renderItem} items={items} {...pagination} onEndReached={this.handleEndReached} onRefresh={this.handleRefresh} />
        <MiniPlayer navigation={this.props.navigation} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
})

TagsAlbums.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadTagsAlbums: PropTypes.func.isRequired
  })
}

export default TagsAlbums
