import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'

import List from 'src/components/list'

class BibleBooks extends React.PureComponent {

  handlePressItem = item => {
    this.props.actions.loadBibleChapters(false, false, item)
    this.props.navigation.navigate({ routeName: 'Chapters' })
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        leftIcon={{type: 'feather', name: 'volume-2'}}
        title={item.name}
        onPress={this.handlePressItem.bind(this, item)}
        bottomDivider
      />
    )
  }

  render() {
    const { navigation, items, pagination, actions } = this.props

    return (
      <List
        navigation={navigation}
        items={items}
        pagination={pagination}
        actions={{loadData: actions.loadData}}
        renderItem={this.renderItem}
        keyExtractor={item => item.book_id}
      />
    )
  }

}

BibleBooks.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadData: PropTypes.func.isRequired,
    loadBibleChapters: PropTypes.func.isRequired
  }),
}

export default BibleBooks
