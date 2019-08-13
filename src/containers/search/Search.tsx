import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
} from 'react-native'
import ActionSheet from 'react-native-action-sheet'
import {
  SearchBar,
  ListItem,
  Button,
} from 'react-native-elements'
import firebase from 'react-native-firebase'
import { NavigationScreenProps, NavigationNavigatorProps } from 'react-navigation'

import HeaderTitle from '../../navigators/headertitle'
import I18n from '../../../locales'
import { Endpoints } from '../../constants'
import {
  searchPresentations,
  fetchData
} from '../../services'
import { resetAndPlayTrack } from '../../actions'

interface Item {
  [key: string]: any
}

interface Props extends NavigationScreenProps {
  actions: {
    resetAndPlayTrack: typeof resetAndPlayTrack
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const Search: React.FC<Props> & NavigationNavigatorProps = ({ navigation, actions }) => {

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(I18n.t('presentations'))
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const searchRef: any = useRef(null)

  useEffect(() => {
    searchRef.current.focus()
    navigation.setParams({handleMore: handleMore})
  }, [])

  const handleMore = () => {
    const options = [
      I18n.t('presentations'),
      I18n.t('presenters'),
      I18n.t('conferences'),
      I18n.t('Cancel')
    ]

    ActionSheet.showActionSheetWithOptions({
      title: '',
      options: options,
      cancelButtonIndex: options.length - 1,
    }, buttonIndex => {
      if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
        if (category !== options[buttonIndex]) {
          setCategory(options[buttonIndex])
          setData([])
          searchRef.current.clear()
          searchRef.current.focus()
        }
      }
    })
  }

  const handleSearch = async () => {
    if (search.trim() !== '') {
      // firebase analytics
      firebase.analytics().logEvent('search', { search_term: search })
      // search
      let url = '', searchFn = null, parseFn = null
      if (category === I18n.t('presentations')) {
        url = Endpoints.searchPresentations
        searchFn = searchPresentations
        parseFn = (data: Item[]) => data
      } else if (category === I18n.t('presenters')) {
        url = Endpoints.searchPresenters
        searchFn = fetchData
        parseFn = (data: Item[]) => data.map(el => el.presenters)
      } else { // conferences
        url = Endpoints.searchConferences
        searchFn = fetchData
        parseFn = (data: Item[]) => data.map(el => el.conferences)
      }

      try {
        setLoading(true)
        let response = await searchFn(url + search)
        setLoading(false)
        setData(parseFn(response.result) as [])
      } catch(e) {
        console.log(e)
        setLoading(false)
      }
    }
  }

  const header = (
    <SearchBar
      lightTheme
      round
      autoCorrect={false}
      placeholder={I18n.t('search')}
      autoFocus
      showLoading={loading}
      ref={searchRef}
      value={search}
      onChangeText={setSearch}
      onSubmitEditing={handleSearch}
      accessibilityRole="search"
      accessibilityLabel={I18n.t("search")} />
  )

  const renderItem: ListRenderItem<Item> = ({ item }) => {
    if (category === I18n.t('presentations')) {
      return (
        <ListItem
          leftAvatar={{
            source: item.artwork && item.artwork.toString().startsWith('http') ? 
            { uri: item.artwork } : item.artwork
          }}
          title={item.title}
          titleProps={{numberOfLines: 1}}
          subtitle={item.artist + ' \u00B7 ' + item.durationFormatted}
          onPress={() => actions.resetAndPlayTrack([item])}
          bottomDivider
        />
      )
    } else if (category === I18n.t('presenters')) {
      return (
        <ListItem
          leftAvatar={{source: {uri: item.photo86}}}
          title={item.givenName + ' ' + item.surname}
          onPress={() => navigation.navigate({ routeName: 'Presenter', params: { url: item.recordingsURI, title: item.givenName + ' ' + item.surname } })}
        />
      )
    } else { // conferences
      return (
        <ListItem
          leftAvatar={{source: {uri: item.photo86}}}
          title={item.title}
          onPress={() => navigation.navigate({ routeName: 'Conference', params: { url: item.recordingsURI, title: item.title } })}
        />
      )
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={header}
        renderItem={renderItem}
        data={data}
        keyExtractor={item => item.id}
        refreshing={false}
        onRefresh={handleSearch} />
    </View>
  )

}

Search.navigationOptions = ({ navigation }: any) => ({
  headerTitle: <HeaderTitle title="search" />,
  headerRight: <Button
    icon={{
      type: 'feather',
      name: 'more-vertical',
      size: 24,
      color: '#FFFFFF',
    }}
    type="clear"
    onPress={() => { navigation.state.params.handleMore() }}
    accessibilityLabel={I18n.t("search_filters")} />
})

export default Search
