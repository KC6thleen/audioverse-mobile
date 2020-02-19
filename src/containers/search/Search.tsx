import React, { useState } from 'react'
import {
  FlatList,
  ListRenderItem,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import {
  ListItem,
} from 'react-native-elements'
import firebase from 'react-native-firebase'
import { NavigationNavigatorProps, NavigationInjectedProps } from 'react-navigation'
import { TabView, TabBar } from 'react-native-tab-view'
import SearchLayout from 'react-navigation-addon-search-layout'
import { Track } from 'react-native-track-player'

import I18n from '../../../locales'
import { Endpoints } from '../../constants'
import * as services from '../../services'
import { resetAndPlayTrack } from '../../actions'
import { GlobalStyles, primaryColor } from '../../styles'
import { parseRecording } from '../../utils'
import { defaultImage } from '../../styles'
import TabBarLabel from '../../navigators/tabbarlabel'

interface Item {
  [key: string]: any
}

interface SearchResult {
  presentation: {
    recordings: Track
  }[]
  presenter: {
    presenters: Item
  }[]
  conference: {
    conferences: Item
  }[]
  series: {
    series: Item
  }[]
  sponsor: {
    sponsors: Item
  }[]
}

interface Props extends NavigationInjectedProps {
  actions: {
    resetAndPlayTrack: typeof resetAndPlayTrack
  }
}

interface ResultsRouteI {
  data: any[]
  renderItem: ListRenderItem<Item>
  onRefresh?: () => void
}

const ResultsRoute: React.FC<ResultsRouteI> = ({ data, renderItem, onRefresh }) => {
  return (
    <FlatList
      renderItem={renderItem}
      data={data}
      keyExtractor={item => item.id}
      refreshing={false}
      onRefresh={onRefresh} />
  )
}

const Search: React.FC<Props> & NavigationNavigatorProps = ({ navigation, actions }) => {

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [presentations, setPresentations] = useState([] as Track[])
  const [presenters, setPresenters] = useState([] as Item[])
  const [conferences, setConferences] = useState([] as Item[])
  const [series, setSeries] = useState([] as Item[])
  const [sponsors, setSponsors] = useState([] as Item[])
  const [tabViewNavigationState, setTabViewNavigationState] = useState({
    index: 0,
    routes: [
      { key: 'presentations', title: 'presentations' },
      { key: 'presenters', title: 'presenters' },
      { key: 'conferences', title: 'conferences' },
      { key: 'series', title: 'series' },
      { key: 'sponsors', title: 'sponsors' },
    ],
  })

  const handleSearch = async () => {
    if (search.trim() !== '') {
      // firebase analytics
      firebase.analytics().logEvent('search', { search_term: search })
      // search
      let url = Endpoints.search

      try {
        setLoading(true)
        const response = await services.search(url + search)
        setLoading(false)
        const data: SearchResult = response.result
        setPresentations(
          data.presentation.map((item) => parseRecording(item.recordings))
        )
        setPresenters(
          data.presenter.map((item) => item.presenters)
        )
        setConferences(
          data.conference.map((item) => item.conferences)
        )
        setSeries(
          data.series.map((item) => item.series)
        )
        setSponsors(
          data.sponsor.map((item) => item.sponsors)
        )
      } catch(e) {
        console.log(e)
        setLoading(false)
      }
    }
  }

  const renderPresentationItem: ListRenderItem<Item> = ({ item }) => (
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
  
  const renderPresenterItem: ListRenderItem<Item> = ({ item }) => (
    <ListItem
      leftAvatar={{
        source: item.photo !== '' ? {uri: item.photo86} : defaultImage
      }}
      title={item.givenName + ' ' + item.surname}
      onPress={() => {
        navigation.navigate({
          routeName: 'Presenter',
          params: {
            url: item.recordingsURI,
            title: item.givenName + ' ' + item.surname,
            description: item.description,
            image: item.photo256,
          }
        })}
      }
      bottomDivider
    />
  )
  
  const renderConferenceItem: ListRenderItem<Item> = ({ item }) => (
    <ListItem
      leftAvatar={{
        source: item.logo !== '' || item.sponsorLogo !== '' ? {uri: item.photo86} : defaultImage
      }}
      title={item.title}
      onPress={() => navigation.navigate({ routeName: 'Conference', params: { url: item.recordingsURI, title: item.title } })}
      bottomDivider
    />
  )

  const renderSerieItem: ListRenderItem<Item> = ({ item }) => (
    <ListItem
      leftAvatar={{
        source: item.logo !== '' ? {uri: item.photo86} : defaultImage
      }}
      title={item.title}
      onPress={() => navigation.navigate({ routeName: 'Serie', params: { url: item.recordingsURI, title: item.title } })}
      bottomDivider
    />
  )

  const renderSponsorItem: ListRenderItem<Item> = ({ item }) => (
    <ListItem
      leftAvatar={{
        source: item.logo !== '' ? {uri: item.photo86} : defaultImage
      }}
      title={item.title}
      onPress={() => navigation.navigate({ routeName: 'Sponsor', params: { url: item.recordingsURI, title: item.title } })}
      bottomDivider
    />
  )

  return (
    <SearchLayout
      headerBackgroundColor={primaryColor}
      onChangeQuery={setSearch}
      onSubmit={handleSearch}
      cancelButtonText={I18n.t('Cancel')}
      headerTintColor="#FFF">
      {loading && 
        <ActivityIndicator
          size="large"
          color="#03A9F4"
          style={{marginTop: 10}}
        />
      }
      {!loading &&
        <TabView
          navigationState={tabViewNavigationState}
          renderScene={({ route }) => {
            switch (route.key) {
              case 'presentations':
                return <ResultsRoute data={presentations} renderItem={renderPresentationItem} onRefresh={handleSearch} />
              case 'presenters':
                return <ResultsRoute data={presenters} renderItem={renderPresenterItem} onRefresh={handleSearch} />
              case 'conferences':
                return <ResultsRoute data={conferences} renderItem={renderConferenceItem} onRefresh={handleSearch} />
              case 'series':
                return <ResultsRoute data={series} renderItem={renderSerieItem} onRefresh={handleSearch} />
              case 'sponsors':
                return <ResultsRoute data={sponsors} renderItem={renderSponsorItem} onRefresh={handleSearch} />
            }
          }}
          renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={GlobalStyles.tabIndicator}
              style={GlobalStyles.tab}
              scrollEnabled={true}
              renderLabel={({ route, focused, color }) => <TabBarLabel tintColor={color} title={route.title} />}
            />
          }
          onIndexChange={index => setTabViewNavigationState({ ...tabViewNavigationState, index })}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      }
    </SearchLayout>
  )

}

Search.navigationOptions = () => ({
  headerShown: false,
})

export default Search
