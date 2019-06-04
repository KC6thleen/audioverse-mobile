import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { ListItem } from 'react-native-elements'

import { defaultImage } from 'src/styles'

class List extends React.PureComponent {

  onEndReachedCalledDuringMomentum = true

  componentDidMount() {
    const { url, id } = this.props.navigation.state.params || {}
    this.props.actions.loadData(false, false, url, id)
  }

  handleEndReached = () => {
    console.log('end reached!!', this.onEndReachedCalledDuringMomentum)
    const { pagination } = this.props
    if (!this.onEndReachedCalledDuringMomentum && pagination && pagination.nextPageUrl) {
      this.onEndReachedCalledDuringMomentum = true
      const { url, id } = this.props.navigation.state.params || {}
      this.props.actions.loadData(true, false, url, id)
    }
  }

  handleRefresh = () => {
    const { url, id } = this.props.navigation.state.params || {}
    this.props.actions.loadData(false, true, url, id)
  }

  avatar(item) {
    const avatar = this.props.avatarExtractor(item)
    return {
      source: avatar && avatar.toString().startsWith('http') ? 
      { uri: avatar } : avatar ? avatar : defaultImage
    }
  }

  handlePress(item) {
    if (this.props.onPress) {
      this.props.onPress(item)
    } else {
      if (this.props.playlist) {
        this.props.localActions.resetAndPlayTrack(this.props.items, item.id)
      } else {
        this.props.localActions.resetAndPlayTrack([item])
      }
    }
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        leftAvatar={this.avatar(item)}
        title={this.props.titleExtractor(item)}
        titleProps={{numberOfLines: 1}}
        subtitle={this.props.subtitleExtractor(item)}
        onPress={() => this.handlePress(item)}
        bottomDivider
      />
    )
  }
  
  render() {
    const { navigation, items, pagination, renderItem, keyExtractor } = this.props

    if (!items.length && pagination.isFetching) {
      return (
        <ActivityIndicator
          size="large"
          color="#03A9F4"
          style={{margin: 50}}
        />
      )
    }

    const { image, description } = navigation.state.params || {}
    const Header =
      image && description ?
        <View style={styles.headerContainer}>
          <View style={styles.headerImageContainer}>
            <Image
              style={styles.headerImage}
              source={{uri: image}}
            />
          </View>
          { description ? <Text style={styles.headerText}>{description}</Text> : null }
        </View>
        : null
      

    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={Header}
          data={items}
          renderItem={renderItem ? renderItem : this.renderItem}
          keyExtractor={keyExtractor}
          refreshing={pagination.isFetching}
          onRefresh={this.handleRefresh}
          onEndReachedThreshold={0.1}
          onEndReached={this.handleEndReached}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#CCCCCC50',
    textAlign: 'center'
  },
  headerImageContainer: {
    alignItems: 'center'
  },
  headerImage: {
    width: 128,
    height: 128,
    borderRadius: 64
  },
  headerText: {
    textAlign: 'justify',
    marginTop: 10,
  },
})

List.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  renderItem: PropTypes.func,
  keyExtractor: PropTypes.func,
  avatarExtractor: PropTypes.func,
  titleExtractor: PropTypes.func,
  subtitleExtractor: PropTypes.func,
  onPress: PropTypes.func,
  localActions: PropTypes.shape({
    resetAndPlayTrack: PropTypes.func.isRequired,
  }),
  actions: PropTypes.shape({
    loadData: PropTypes.func.isRequired,
  }),
}

List.defaultProps = {
  keyExtractor: item => item.id,
  avatarExtractor: item => item.artwork,
  titleExtractor: item => item.title,
  subtitleExtractor: item => item.artist + ' \u00B7 ' + item.duration,
  playlist: false,
}

export default List
