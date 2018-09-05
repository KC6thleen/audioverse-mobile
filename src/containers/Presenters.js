import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import List from '../components/list/List'
import ListItem from '../components/list/ListItem'
import MiniPlayer from '../components/miniplayer'
import { loadPresenters } from '../actions'
import { getPresenters, getPresentersPagination } from '../reducers/selectors'

class Presenters extends PureComponent {

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
        title={item.givenName + ' ' + item.surname}
        onPress={() => this.props.navigation.navigate({ routeName: 'Presenter', params: { url: item.recordingsURI } })}
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

Presenters.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  load: PropTypes.func.isRequired,
  loadMore: PropTypes.func,
  refresh: PropTypes.func
}

const mapStateToProps = (state) => ({
  items: getPresenters(state),
  pagination: getPresentersPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadPresenters(false, false)),
  loadMore: () => dispatch(loadPresenters(true, false)),
  refresh: () => dispatch(loadPresenters(false, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Presenters)
