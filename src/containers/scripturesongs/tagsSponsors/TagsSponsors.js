import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'

class TagsSponsors extends PureComponent {

  componentDidMount() {
    this.props.actions.loadTagsSponsors()
  }

  handleEndReached = () => {
    this.props.actions.loadTagsSponsors(true, false)
  }

  handleRefresh = () => {
    this.props.actions.loadTagsSponsors(false, true)
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        avatar={{source: item.photo86}}
        title={item.title}
        onPress={() => this.props.navigation.navigate({ routeName: 'TagSponsor', params: { url: item.recordingsURI, title: item.title } })}
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

TagsSponsors.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadTagsSponsors: PropTypes.func.isRequired
  })
}

export default TagsSponsors
