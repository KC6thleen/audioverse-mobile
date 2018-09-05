import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import List from '../components/list/List'
import ListItem from '../components/list/ListItem'
import MiniPlayer from '../components/miniplayer'
import { loadTrendingRecordings, resetAndPlayTrack } from '../actions'
import { getTrendingRecordings, getTrendingRecordingsPagination } from '../reducers/selectors'

class TrendingRecordings extends PureComponent {

  componentDidMount() {
    this.props.load()
  }

  handlePressMetaData() {
    this.props.navigation.navigate({ routeName: 'NowPlaying' })
  }

  renderItem({ item }) {
    return (
      <ListItem
        avatar={{source: item.artwork}}
        title={item.title}
        subtitle={item.artist + ' \u00B7 ' + item.duration}
        onPress={() => this.props.resetAndPlayTrack(null, item)}
      />
    )
  }

  render() {
    const { items, pagination, loadMore, refresh } = this.props

    return (
      <View style={styles.container}>
        <List renderItem={this.renderItem.bind(this)} items={items} {...pagination} onEndReached={loadMore} onRefresh={refresh} />
        <MiniPlayer onPressMetaData={this.handlePressMetaData.bind(this)} />
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

TrendingRecordings.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  load: PropTypes.func.isRequired,
  loadMore: PropTypes.func,
  refresh: PropTypes.func,
  resetAndPlayTrack: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  items: getTrendingRecordings(state),
  pagination: getTrendingRecordingsPagination(state)
})

const mapDispatchToProps = dispatch => ({
  load: (loadMore, refresh) => dispatch(loadTrendingRecordings(loadMore, refresh)),
  loadMore: () => dispatch(loadTrendingRecordings(true, false)),
  refresh: () => dispatch(loadTrendingRecordings(false, true)),
  resetAndPlayTrack: (tracks, track) => dispatch(resetAndPlayTrack(tracks, track))
})

export default connect(mapStateToProps, mapDispatchToProps)(TrendingRecordings)
