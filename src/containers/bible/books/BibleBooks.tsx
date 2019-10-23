import React from 'react'
import { ListRenderItem } from 'react-native'
import { ListItem } from 'react-native-elements'
import { NavigationInjectedProps } from 'react-navigation'

import List from '../../../components/list'
import { LoadDataType, LoadBibleChaptersType } from '../../../actions'
import { PaginationState } from '../../../store/paginate'

interface Props extends NavigationInjectedProps {
  items: {}[]
  pagination: PaginationState
  actions: {
    loadData: LoadDataType
    loadBibleChapters: LoadBibleChaptersType
  }
}

const BibleBooks: React.FC<Props> = ({ navigation, items, pagination, actions }) => {

  const handlePressItem = (item:  {}) => {
    actions.loadBibleChapters(false, false, item)
    navigation.navigate({ routeName: 'Chapters' })
  }

  const renderItem: ListRenderItem<{[key: string]: any}> = ({ item }) => {
    return (
      <ListItem
        leftIcon={{type: 'feather', name: 'volume-2'}}
        title={item.name}
        onPress={handlePressItem.bind(null, item)}
        bottomDivider
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
      keyExtractor={item => item.book_id}
    />
  )

}

export default BibleBooks
