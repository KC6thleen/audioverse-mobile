import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import { defaultImage } from 'src/styles'

class TagsBooks extends PureComponent {

  componentDidMount() {
    this.props.actions.loadTagsBooks()
  }

  handleRefresh = () => {
    this.props.actions.loadTagsBooks(false, true)
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        avatar={{source: defaultImage}}
        title={item.name}
        onPress={() => this.props.navigation.navigate({ routeName: 'TagBook', params: { url: item.recordingsURI, title: item.name } })}
      />
    )
  }

  render() {
    const { items, pagination } = this.props

    return (
      <View style={styles.container}>
        <List renderItem={this.renderItem} items={items} {...pagination} onRefresh={this.handleRefresh} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

TagsBooks.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadTagsBooks: PropTypes.func.isRequired
  })
}

export default TagsBooks
