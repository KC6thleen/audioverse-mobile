import React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
} from 'react-native'
import {
  ListItem,
  Button,
} from 'react-native-elements'

import I18n from '../../../locales'
import { removeFromDownloadsQueue } from '../../store/downloadsQueue/actions'

interface Item {
  [key: string]: any
}

interface Props {
  items: {}[]
  actions: {
    removeFromDownloadsQueue: typeof removeFromDownloadsQueue
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const DownloadsQueue: React.FC<Props> = ({ items, actions }) => {

  const handleRemoveFromDownloadsQueue = (item: {}) => {
    actions.removeFromDownloadsQueue(item)
  }

  const renderItem: ListRenderItem<Item> = ({ item }) => {
    return (
      <ListItem
        leftAvatar={{
          source: item.artwork && item.artwork.toString().startsWith('http') ? 
          { uri: item.artwork } : item.artwork
        }}
        title={item.title}
        titleProps={{numberOfLines: 1}}
        subtitle={isNaN(item.progress) ? '' : item.progress * 100 + '%'}
        rightElement={<RightElement data={item} onPress={handleRemoveFromDownloadsQueue} />}
        bottomDivider
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.fileName}
      />
    </View>
  )

}

interface RightElementProps {
  data: {}
  onPress: (data: {}) => void
}

const RightElement: React.FC<RightElementProps> = ({ data, onPress }) => {
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
