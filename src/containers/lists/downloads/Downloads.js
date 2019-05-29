import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native'
import { ListItem } from 'react-native-elements'

import IconButton from 'src/components/buttons/IconButton'
import I18n from 'locales'

class Downloads extends React.PureComponent {

  handleRemove = item => {
    Alert.alert(
      I18n.t('Are_you_sure_you_want_to_delete_this'),
      '',
      [
        {text: I18n.t('Cancel'), onPress: () => {}, style: 'cancel'},
        {text: I18n.t('Yes'), onPress: () => { this.props.actions.remove(item) }}
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
        subtitle={`${item.artist} \u00B7 ${item.bitRate} kbps`}
        onPress={() => this.props.actions.resetAndPlayTrack([item])}
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
          keyExtractor={item => item.fileName}
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

Downloads.propTypes = {
  items: PropTypes.array,
  actions: PropTypes.shape({
    resetAndPlayTrack: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }),
}

const RightElement = ({ data, onPress }) => {
  const _onPress = () => { onPress(data) }
  return <IconButton
    name="x"
    size={24}
    onPress={_onPress}
    accessibilityLabel={I18n.t('delete')} />
}

export default Downloads
