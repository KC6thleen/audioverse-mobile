import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'

class Sponsors extends PureComponent {

  componentDidMount() {
    this.props.actions.loadSponsors()
  }

  handleEndReached = () => {
    this.props.actions.loadSponsors(true, false)
  }

  handleRefresh = () => {
    this.props.actions.loadSponsors(false, true)
  }

  renderItem({ item }) {
    return (
      <ListItem
        avatar={{source: item.photo86}}
        title={item.title}
        onPress={() => this.props.navigation.navigate({ routeName: 'Sponsor', params: { url: item.recordingsURI, title: item.title } })}
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

Sponsors.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadSponsors: PropTypes.func.isRequired
  })
}

export default Sponsors
