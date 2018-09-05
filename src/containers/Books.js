import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import List from '../components/list/List'
import ListItem from '../components/list/ListItem'
import MiniPlayer from '../components/miniplayer'
import { loadBooks } from '../actions'
import { getBooks, getBooksPagination } from '../reducers/selectors'

class Books extends PureComponent {

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
        onPress={() => this.props.navigation.navigate({ routeName: 'Book', params: { url: item.recordingsURI } })}
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

Books.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  load: PropTypes.func.isRequired,
  loadMore: PropTypes.func,
  refresh: PropTypes.func
}

const mapStateToProps = (state) => ({
  items: getBooks(state),
  pagination: getBooksPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadBooks(false, false)),
  loadMore: () => dispatch(loadBooks(true, false)),
  refresh: () => dispatch(loadBooks(false, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Books)
