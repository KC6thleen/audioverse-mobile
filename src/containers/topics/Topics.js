import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'
import defaultImage from 'assets/av-logo.png'

class Topics extends PureComponent {

  componentDidMount() {
    this.props.actions.loadTopics()
  }

  handleEndReached = () => {
    this.props.actions.loadTopics(true, false)
  }

  handleRefresh = () => {
    this.props.actions.loadTopics(false, true)
  }

  renderItem({ item }) {
    return (
      <ListItem
        avatar={{source: defaultImage}}
        title={item.title}
        onPress={() => this.props.navigation.navigate({ routeName: 'Topic', params: { url: item.recordingsURI, title: item.title } })}
      />
    )
  }

  render() {
    const { items, pagination } = this.props

    return (
      <View style={styles.container}>
        <List renderItem={this.renderItem.bind(this)} items={items} {...pagination} onEndReached={this.handleEndReached} onRefresh={this.handleRefresh} />
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

Topics.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadTopics: PropTypes.func.isRequired
  })
}

export default Topics
