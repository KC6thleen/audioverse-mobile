import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'

class Tag extends PureComponent {

  componentDidMount() {
    this.props.actions.loadTag(false, false, this.props.navigation.state.params.url)
  }

  handleRefresh = () => {
    this.props.actions.loadTag(false, true, this.props.navigation.state.params.url)
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        avatar={{source: item.artwork}}
        title={item.title}
        subtitle={item.artist + ' \u00B7 ' + item.duration}
        onPress={() => this.props.actions.resetAndPlayTrack(this.props.items, item.id)}
      />
    )
  }
  
  render() {
    const { items, pagination } = this.props
    const url = this.props.navigation.state.params.url

    return (
      <View style={styles.container}>
        <List renderItem={this.renderItem} items={items} {...pagination} onRefresh={this.handleRefresh} />
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

Tag.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadTag: PropTypes.func.isRequired,
    resetAndPlayTrack: PropTypes.func.isRequired
  })
}

export default Tag
