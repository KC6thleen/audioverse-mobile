import React, { useEffect } from 'react'
import {
  View,
  FlatList,
  Alert,
  StyleSheet,
  ListRenderItem,
} from 'react-native'
import {
  ListItem,
  Button,
} from 'react-native-elements'
import { NavigationInjectedProps } from 'react-navigation'

import I18n from '../../../../locales'
import { Dirs } from '../../../constants'
import {
  LoadBibleChaptersType,
  resetAndPlayTrack,
  download,
  removeLocalBibleChapter,
} from '../../../actions'
import { bibleChapter } from '../../../store/Bible/actions'
import { BibleState } from '../../../store/Bible/types'
import { addLocalFiles } from '../../../store/localFiles/actions'
import { PaginationState } from '../../../store/paginate'

interface Props extends NavigationInjectedProps {
  items: {[key: string]: any}[]
  pagination: PaginationState
  bible: BibleState
  actions: {
    bibleChapter: typeof bibleChapter
    loadBibleChapters: LoadBibleChaptersType
    download: typeof download
    addLocalFiles: typeof addLocalFiles
    removeLocalBibleChapter: typeof removeLocalBibleChapter
    resetAndPlayTrack: typeof resetAndPlayTrack
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: '25%',
    padding: 15,
    alignItems: 'center',
  },
  chapter: {
    fontSize: 18,
  },
})

const BibleChapters: React.FC<Props> = ({
  navigation,
  items,
  pagination,
  bible,
  actions
}) => {

  useEffect(() => {
    if (!items.length) {
      actions.loadBibleChapters(false, false, bible.book)
    }
  }, [])

  const handlePressItem = (item: {[key: string]: any}) => {
    actions.bibleChapter(item.chapter)

    actions.resetAndPlayTrack(items, item.id)
    navigation.navigate({ routeName: 'Verses' })

  }

  const handlePressItemAction = (item: {[key: string]: any}) => {
    if (item.local) {
      Alert.alert(
        I18n.t('Are_you_sure_you_want_to_delete_this'),
        '',
        [
          {text: I18n.t('Cancel'), onPress: () => {}, style: 'cancel'},
          {text: I18n.t('Yes'), onPress: () => { actions.removeLocalBibleChapter(item) }}
        ]
      )
    } else {
      actions.download(
        item,
        Dirs.bible,
        item.downloadURL,
        item.fileName,
        '',
        actions.addLocalFiles.bind(null, [item.id])
      )
    }
  }

  const renderItem: ListRenderItem<{[key: string]: any}> = ({ item }) => {
    return (
      <ListItem
        title={`${bible.book.name} ${item.chapter}`}
        onPress={handlePressItem.bind(null, item)}
        rightElement={<RightElement data={item} onPress={handlePressItemAction} />}
        bottomDivider
      />
    )
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.chapter}
        refreshing={pagination.isFetching}
      />
    </View>
  )

}

interface PropsRightElement {
  data: {[key: string]: any}
  onPress: (data: {}) => void
}

const RightElement: React.FC<PropsRightElement> = ({ data, onPress }) => {
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

export default BibleChapters
