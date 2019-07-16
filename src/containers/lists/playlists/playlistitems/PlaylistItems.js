import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native'
import {
  ListItem,
  Button,
} from 'react-native-elements'

import I18n from 'locales'

class PlaylistItems extends React.PureComponent {

  componentDidMount() {
    this.props.actions.sync(this.props.navigation.state.params.playlistId)
  }

  handleRemove = item => {
    Alert.alert(
      I18n.t('Are_you_sure_you_want_to_delete_this'),
      '',
      [
        {text: I18n.t('Cancel'), onPress: () => {}, style: 'cancel'},
        {text: I18n.t('Yes'), onPress: () => { this.props.actions.remove(item.playlistId, item.id) }}
      ]
    )
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        leftAvatar={{
          source: item.artwork && item.artwork.toString().startsWith('http') ? 
          { uri: item.artwork } : item.artwork
        }}
        title={item.title}
        titleProps={{numberOfLines: 1}}
        subtitle={item.artist + ' \u00B7 ' + item.duration}
        onPress={() => this.props.actions.resetAndPlayTrack(this.props.items, item.id)}
        rightElement={<RightElement data={item} onPress={this.handleRemove} />}
        bottomDivider
      />
    )
  }

  render() {
    const { items } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

PlaylistItems.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array,
  actions: PropTypes.shape({
    resetAndPlayTrack: PropTypes.func.isRequired,
    sync: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }),
}

const RightElement = ({ data, onPress }) => {
  const _onPress = () => { onPress(data) }
  return (
    <Button
      icon={{
        type: 'feather',
        name: 'x',
        size: 24,
      }}
      buttonStyle={{padding: 0}}
      type="clear"
      onPress={_onPress}
      accessibilityLabel={I18n.t('delete')} />
  )
}

export default PlaylistItems
