import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, StyleSheet } from 'react-native'

import List from 'src/components/list/List'
import ListItem from 'src/components/list/ListItem'
import MiniPlayer from 'src/components/miniplayer'
import IconButton from 'src/components/buttons/IconButton'

class DownloadsQueue extends PureComponent {

  handleRemoveFromDownloadsQueue = (item) => {
    this.props.removeFromDownloadsQueue(item)
  }

  renderItem({ item }) {
    return (
      <ListItem
        avatar={{source: item.artwork}}
        title={item.title}
        subtitle={isNaN(item.progress) ? '' : item.progress * 100 + '%'}
        rightElement={<RightElement data={item} onPress={this.handleRemoveFromDownloadsQueue} />}
      />
    )
  }

  render() {
    const { items } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.fileName}
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
  }
})

DownloadsQueue.propTypes = {
  navigation: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  removeFromDownloadsQueue: PropTypes.func.isRequired
}

const RightElement = ({ data, onPress }) => {
  const _onPress = () => { onPress(data) }
  return <IconButton onPress={_onPress} name="x" size={24} />
}

export default DownloadsQueue
