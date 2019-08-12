import React from 'react'
import {
  Alert,
  ListRenderItem,
} from 'react-native'
import {
  ListItem,
  Button,
} from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'

import List from '../../../components/list'
import I18n from '../../../../locales'
import { Dirs } from '../../../constants'
import { PaginationState } from '../../../store/paginate'
import {
  LoadBookType,
  removeLocalChapter,
  download,
  resetAndPlayTrack,
} from '../../../actions'
import { addLocalFiles } from '../../../store/localFiles/actions'

interface Item {
  [key: string]: any
}

interface Props extends NavigationScreenProps {
  items: any[]
  pagination: PaginationState
  actions: {
    loadData: LoadBookType
    addLocalFiles: typeof addLocalFiles
    removeLocalChapter: typeof removeLocalChapter
    download: typeof download
    resetAndPlayTrack: typeof resetAndPlayTrack
  }
}

const Book: React.FC<Props> = ({
  navigation,
  items,
  pagination,
  actions
}) => {

  const handlePressItemAction = (item: Item) => {
    if (item.local) {
      Alert.alert(
        I18n.t('Are_you_sure_you_want_to_delete_this'),
        '',
        [
          {text: I18n.t('Cancel'), onPress: () => {}, style: 'cancel'},
          {text: I18n.t('Yes'), onPress: () => { actions.removeLocalChapter(item) }}
        ]
      )
    } else {
      const mediaFile = item.mediaFiles[0]
      actions.download(
        item,
        Dirs.audiobooks,
        mediaFile.downloadURL,
        mediaFile.filename,
        mediaFile.bitrate,
        actions.addLocalFiles.bind(null, [item.id])
      )
    }
  }

  const renderItem: ListRenderItem<Item> = ({ item }) => {
    return (
      <ListItem
        leftAvatar={
          {
            source: item.artwork && item.artwork.toString().startsWith('http') ? 
            { uri: item.artwork } : item.artwork
          }
        }
        title={item.title}
        titleProps={{numberOfLines: 1}}
        subtitle={item.artist}
        onPress={() => actions.resetAndPlayTrack(items, item.id)}
        bottomDivider
        rightElement={<RightElement data={item} onPress={handlePressItemAction} />}
      />
    )
  }

  return (
    <List
      navigation={navigation}
      items={items}
      pagination={pagination}
      actions={{loadData: actions.loadData}}
      renderItem={renderItem}
    />
  )

}

interface RightElementProps {
  data: Item
  onPress: (data: Item) => void
}

const RightElement: React.FC<RightElementProps> = ({ data, onPress }) => {
  const handlePress = () => { onPress(data) }
  return (
    <Button
      icon={{
        type: 'feather',
        name: data.local ? 'x' : 'download',
        size: 24,
      }}
      buttonStyle={{padding: 0}}
      type="clear"
      onPress={handlePress}
      accessibilityLabel={I18n.t(data.local ? 'delete' : 'download_file')} />
  )
}

export default Book
