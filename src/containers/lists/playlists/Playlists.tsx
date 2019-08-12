import React, { useEffect } from 'react'
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
import { NavigationScreenProps } from 'react-navigation'

import I18n from '../../../../locales'
import {
  syncPlaylists,
  removePlaylist,
} from '../../../actions'

interface Item {
  [key: string]: any
}

interface Props extends NavigationScreenProps {
  items: {}[]
  actions: {
    sync: typeof syncPlaylists
    remove: typeof removePlaylist
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    height: 70,
  },
})

const Playlists: React.FC<Props> = ({ items, actions, navigation }) => {

  useEffect(() => {
    actions.sync()
  }, [])

  const handleRemove = (item: Item) => {
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
        containerStyle={styles.listItem}
        leftIcon={{type: 'feather', name: 'check'}}
        title={item.title}
        titleProps={{numberOfLines: 1}}
        onPress={() => { navigation.navigate({ routeName: 'PlaylistItems', params: { playlistId: item.id, title: item.title } }) }}
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
        keyExtractor={item => item.id}
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

export default Playlists
