import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'

class Stories extends PureComponent {

  componentDidMount() {
    this.props.actions.loadStories()
  }

  handleEndReached = () => {
    this.props.actions.loadStories(true, false)
  }

  handleRefresh = () => {
    this.props.actions.loadStories(false, true)
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        avatar={{source: item.photo86}}
        title={item.title}
        onPress={() => this.props.navigation.navigate({ routeName: 'Story', params: { url: item.recordingsURI, title: item.title } })}
      />
    )
  }

  render() {
    const { items, pagination } = this.props

    return (
      <View style={styles.container}>
        <List renderItem={this.renderItem} items={items} {...pagination} onEndReached={this.handleEndReached} onRefresh={this.handleRefresh} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

Stories.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadStories: PropTypes.func.isRequired
  })
}

export default Stories
