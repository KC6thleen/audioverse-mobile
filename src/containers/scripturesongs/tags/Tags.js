import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import { defaultImage } from 'src/styles'

class Tags extends PureComponent {

  componentDidMount() {
    this.props.actions.loadTags()
  }

  handleRefresh = () => {
    this.props.actions.loadTags(false, true)
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        avatar={{source: defaultImage}}
        title={item.name}
        onPress={() => this.props.navigation.navigate({ routeName: 'Tag', params: { url: item.recordingsURI, title: item.name } })}
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

Tags.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadTags: PropTypes.func.isRequired
  })
}

export default Tags
