import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'

class Presenters extends PureComponent {

  componentDidMount() {
    this.props.actions.loadPresenters()
  }

  handleEndReached = () => {
    this.props.actions.loadPresenters(true, false)
  }

  handleRefresh = () => {
    this.props.actions.loadPresenters(false, true)
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        avatar={{source: item.photo86}}
        title={item.givenName + ' ' + item.surname}
        onPress={() => this.props.navigation.navigate({ routeName: 'Presenter', params: { url: item.recordingsURI, title: item.givenName + ' ' + item.surname } })}
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

Presenters.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadPresenters: PropTypes.func.isRequired
  })
}

export default Presenters
