import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import List from '../components/list/List'
import ListItem from '../components/list/ListItem'
import MiniPlayer from '../components/miniplayer'
import { loadTopics } from '../actions'
import { getTopics, getTopicsPagination } from '../reducers/selectors'
import defaultImage from '../../assets/av-logo.png'

class Topics extends PureComponent {

  componentDidMount() {
    this.props.load()
  }

  handlePressMetaData() {
    this.props.navigation.navigate({ routeName: 'NowPlaying' })
  }

  renderItem({ item }) {
    return (
      <ListItem
        avatar={{source: defaultImage}}
        title={item.title}
        onPress={() => this.props.navigation.navigate({ routeName: 'Topic', params: { url: item.recordingsURI } })}
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

Topics.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  load: PropTypes.func.isRequired,
  loadMore: PropTypes.func,
  refresh: PropTypes.func
}

const mapStateToProps = (state) => ({
  items: getTopics(state),
  pagination: getTopicsPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadTopics(false, false)),
  loadMore: () => dispatch(loadTopics(true, false)),
  refresh: () => dispatch(loadTopics(false, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Topics)
