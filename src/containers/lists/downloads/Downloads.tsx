import React from 'react'
import {
  View,
  FlatList,
  Alert,
  ListRenderItem,
  StyleSheet,
} from 'react-native'
import {
  ListItem,
  Button,
} from 'react-native-elements'

import I18n from '../../../../locales'
import {
  resetAndPlayTrack,
  removeDownload,
} from '../../../actions'

interface Item {
  [key: string]: any
}

interface Props {
  items: {}[]
  actions: {
    resetAndPlayTrack: typeof resetAndPlayTrack
    remove: typeof removeDownload
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const Downloads: React.FC<Props> = ({ items, actions }) => {

  const handleRemove = (item: {}) => {
    Alert.alert(
      I18n.t('Are_you_sure_you_want_to_delete_this'),
      '',
      [
        {text: I18n.t('Cancel'), onPress: () => {}, style: 'cancel'},
        {text: I18n.t('Yes'), onPress: () => { actions.remove(item) }}
      ]
    )
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
        subtitle={`${item.artist} \u00B7 ${item.bitRate} kbps`}
        onPress={() => actions.resetAndPlayTrack([item])}
        rightElement={<RightElement data={item} onPress={handleRemove} />}
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

export default Downloads
