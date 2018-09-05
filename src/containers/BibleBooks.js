import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import List from '../components/list/List'
import ListItem from '../components/list/ListItem'
import MiniPlayer from '../components/miniplayer'
import { loadBibleBooks, loadBibleChapters } from '../actions'
import { getBibleBooks, getBibleBooksPagination } from '../reducers/selectors'

class BibleBooks extends PureComponent {

  componentDidMount() {
    this.props.load()
  }

  handlePressMetaData() {
    this.props.navigation.navigate({ routeName: 'NowPlaying' })
  }

  handlePressItem(item) {
    this.props.loadBibleChapters(item.testament, item.book_id)
    this.props.navigation.navigate({ routeName: 'Chapters' })
  }

  renderItem({ item }) {
    return (
      <ListItem
        icon={{name: 'volume-2'}}
        title={item.name}
        onPress={this.handlePressItem.bind(this, item)}
      />
    )
  }

  render() {
    const { items, pagination, refresh } = this.props

    return (
      <View style={styles.container}>
        <List renderItem={this.renderItem.bind(this)} items={items} keyExtractor={item => item.book_id} {...pagination} onRefresh={refresh} />
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

BibleBooks.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  load: PropTypes.func.isRequired,
  refresh: PropTypes.func,
  loadBibleChapters: PropTypes.func
}

const mapStateToProps = (state) => ({
  items: getBibleBooks(state),
  pagination: getBibleBooksPagination(state)
})

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadBibleBooks(false, false)),
  refresh: () => dispatch(loadBibleBooks(false, true)),
  loadBibleChapters: (testament, book) => dispatch(loadBibleChapters(false, false, testament, book)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BibleBooks)
