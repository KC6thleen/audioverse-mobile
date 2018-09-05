import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import List from '../components/list/List'
import ListItem from '../components/list/ListItem'
import MiniPlayer from '../components/miniplayer'
import { loadConferences } from '../actions'
import { getConferences, getConferencesPagination } from '../reducers/selectors'

class Conferences extends PureComponent {

  componentDidMount() {
    this.props.load()
  }

  handlePressMetaData() {
    this.props.navigation.navigate({ routeName: 'NowPlaying' })
  }

  renderItem({ item }) {
    return (
      <ListItem
        avatar={{source: item.photo86}}
        title={item.title}
        onPress={() => this.props.navigation.navigate({ routeName: 'Conference', params: { url: item.recordingsURI } })}
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

Conferences.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  load: PropTypes.func.isRequired,
  loadMore: PropTypes.func,
  refresh: PropTypes.func
}

const mapStateToProps = (state) => ({
  items: getConferences(state),
  pagination: getConferencesPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadConferences(false, false)),
  loadMore: () => dispatch(loadConferences(true, false)),
  refresh: () => dispatch(loadConferences(false, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Conferences)
