import React, {
  useState,
  useEffect,
  useRef,
} from 'react'
import {
  View,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  StyleSheet,
} from 'react-native'
import { SearchBar, ListItem } from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'

import I18n from '../../../locales'
import { PaginationState } from '../../store/paginate'
import { LoadDataType } from '../../actions'

interface Item {
  [key: string]: any
}

interface Props extends NavigationScreenProps {
  items: any[]
  pagination: PaginationState
  actions: {
    loadPresenters: LoadDataType
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const Presenters: React.FC<Props> = ({ navigation, items, pagination, actions }) => {

  const [search, setSearch] = useState('')
  const [data, setData] = useState<any[]>([])
  const searchRef: any = useRef(null)

  useEffect(() => {
    actions.loadPresenters()
    setData(items)
  }, [])

  useEffect(() => {
    setData(items)
  }, [items])

  const handleChangeText = (search: string) => {
    setSearch(search)
    const text = search.toLowerCase()
    const filteredData = items.filter((el: Item) => {
      return `${el.surname} ${el.givenName}`.toLowerCase().indexOf(text) > -1
    })
    setData(filteredData)
  }

  const handleRefresh = () => {
    actions.loadPresenters(false, true)
    searchRef.current.clear()
  }

  const renderItem: ListRenderItem<Item> = ({ item }) => {
    return (
      <ListItem
        leftAvatar={{
          source: item.photo86 && item.photo86.toString().startsWith('http') ? 
          { uri: item.photo86 } : item.photo86
        }}
        title={item.givenName + ' ' + item.surname}
        titleProps={{numberOfLines: 1}}
        onPress={() => 
          navigation.navigate({
            routeName: 'Presenter',
            params: {
              url: item.recordingsURI,
              title: item.givenName + ' ' + item.surname,
              description: item.description,
              image: item.photo256
            }
          })
        }
        bottomDivider
      />
    )
  }

  const header = () => {
    return (
      <SearchBar
        lightTheme
        round
        autoCorrect={false}
        placeholder={I18n.t('search')}
        autoFocus
        ref={searchRef}
        value={search}
        onChangeText={handleChangeText}
        accessibilityRole="search"
        accessibilityLabel={I18n.t("search")} />
    )
  }
  
  if (!data.length && pagination.isFetching) {
    return (
      <ActivityIndicator
        size="large"
        color="#03A9F4"
        style={{margin: 50}}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={header}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        data={data}
        refreshing={pagination.isFetching}
        onRefresh={handleRefresh} />
    </View>
  )

}

export default Presenters
