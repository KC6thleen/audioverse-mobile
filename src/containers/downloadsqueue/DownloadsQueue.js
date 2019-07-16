import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native'
import {
  ListItem,
  Button,
} from 'react-native-elements'

import I18n from 'locales'

class DownloadsQueue extends React.PureComponent {

  handleRemoveFromDownloadsQueue = item => {
    this.props.actions.removeFromDownloadsQueue(item)
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
        subtitle={isNaN(item.progress) ? '' : item.progress * 100 + '%'}
        rightElement={<RightElement data={item} onPress={this.handleRemoveFromDownloadsQueue} />}
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

DownloadsQueue.propTypes = {
  items: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    removeFromDownloadsQueue: PropTypes.func.isRequired,
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

export default DownloadsQueue
