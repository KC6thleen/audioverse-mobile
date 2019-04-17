import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'

class FeaturedRecordings extends PureComponent {

  componentDidMount() {
    this.props.actions.loadFeaturedRecordings()
  }

  handleEndReached = () => {
    this.props.actions.loadFeaturedRecordings(true, false)
  }

  handleRefresh = () => {
    this.props.actions.loadFeaturedRecordings(false, true)
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        avatar={{source: item.artwork}}
        title={item.title}
        subtitle={item.artist + ' \u00B7 ' + item.duration}
        onPress={() => this.props.actions.resetAndPlayTrack([item])}
      />
    )
  }

  render() {
    const { items, pagination } = this.props

    return (
      <List renderItem={this.renderItem} items={items} {...pagination} onEndReached={this.handleEndReached} onRefresh={this.handleRefresh} />
    )
  }

}

FeaturedRecordings.propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadFeaturedRecordings: PropTypes.func.isRequired,
    resetAndPlayTrack: PropTypes.func.isRequired
  })
}

export default FeaturedRecordings
