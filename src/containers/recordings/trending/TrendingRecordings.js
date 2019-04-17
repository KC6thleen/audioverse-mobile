import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import I18n from 'locales'

class TrendingRecordings extends PureComponent {

  componentDidMount() {
    this.props.actions.loadTrendingRecordings()
  }

  handleEndReached = () => {
    this.props.actions.loadTrendingRecordings(true, false)
  }

  handleRefresh = () => {
    this.props.actions.loadTrendingRecordings(false, true)
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        avatar={{source: item.artwork}}
        title={item.title}
        subtitle={`${item.artist} \u00B7 ${item.duration} \u00B7 ${item.weightValue}/${I18n.t('day')}`}
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

TrendingRecordings.propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadTrendingRecordings: PropTypes.func.isRequired,
    resetAndPlayTrack: PropTypes.func.isRequired
  })
}

export default TrendingRecordings
