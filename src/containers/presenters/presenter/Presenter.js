import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet } from 'react-native'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'

class Presenter extends PureComponent {

  componentDidMount() {
    this.props.actions.loadPresenter(false, false, this.props.navigation.state.params.url)
  }

  handleRefresh = () => {
    this.props.actions.loadPresenter(false, true, this.props.navigation.state.params.url)
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
    const { items, pagination, navigation } = this.props
    const { image, description } = navigation.state.params
    const Bio =
      <View style={styles.bio}>
        <View style={styles.bioImageContainer}>
          <Image
            style={styles.bioImage}
            source={{uri: image}}
          />
        </View>
        { description ? <Text style={styles.bioText}>{description}</Text> : null }
      </View>

    return (
      <View style={styles.container}>
        <List
          ListHeaderComponent={Bio}
          renderItem={this.renderItem}
          items={items}
          {...pagination}
          onRefresh={this.handleRefresh}
        />
        <MiniPlayer navigation={this.props.navigation} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  bio: {
    padding: 20,
    backgroundColor: '#CCCCCC50',
    textAlign: 'center'
  },
  bioImageContainer: {
    alignItems: 'center'
  },
  bioImage: {
    width: 128,
    height: 128,
    borderRadius: 64
  },
  bioText: {
    textAlign: 'justify',
    marginTop: 10
  }
})

Presenter.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  pagination: PropTypes.object,
  actions: PropTypes.shape({
    loadPresenter: PropTypes.func.isRequired,
    resetAndPlayTrack: PropTypes.func.isRequired
  })
}

export default Presenter
