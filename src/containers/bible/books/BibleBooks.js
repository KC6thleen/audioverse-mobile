import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'

class BibleBooks extends PureComponent {

  componentDidMount() {
    if (!this.props.items.length) {
      this.props.actions.loadBibleBooks()
    }
  }

  handleRefresh = () => {
    this.props.actions.loadBibleBooks(false, true)
  }

  handlePressItem = item => {
    this.props.actions.loadBibleChapters(false, false, item)
    this.props.navigation.navigate({ routeName: 'Chapters' })
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        icon={{name: 'volume-2'}}
        title={item.name}
        onPress={this.handlePressItem.bind(this, item)}
      />
    )
  }

  render() {
    const { items, pagination } = this.props

    return (
      <View style={styles.container}>
        <List renderItem={this.renderItem} items={items} keyExtractor={item => item.book_id} {...pagination} onRefresh={this.handleRefresh} />
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

BibleBooks.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadBibleBooks: PropTypes.func.isRequired,
    loadBibleChapters: PropTypes.func.isRequired
  })
}

export default BibleBooks
