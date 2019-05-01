import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import TabBarLabel from './tabbarlabel'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Favorites from 'src/containers/lists/favorites'
import Playlists from 'src/containers/lists/playlists'
import History from 'src/containers/lists/history'
import PlaylistItems from 'src/containers/lists/playlists/playlistitems'

const ListsTab = createMaterialTopTabNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="favorites" />
    }
  },
  Playlists: {
    screen: Playlists,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="playlists" />
    }
  },
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="history" />
    }
  }
}, {
  lazy: true,
  tabBarOptions: {
    style: GlobalStyles.tab,
    scrollEnabled: true,
    indicatorStyle: GlobalStyles.tabIndicator
  }
})

const Navigator = createStackNavigator({
  ListsTab: {
    screen: ListsTab,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderTitle title="my_lists" />,
      headerRight: <HeaderRight navigation={navigation} />
    })
  },
  PlaylistItems: {
    screen: PlaylistItems,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title
    })
  }
}, {
  defaultNavigationOptions: ({ navigation }) => {
    const options  = {
      headerStyle: GlobalStyles.header,
      headerTintColor: headerTintColor,
    }
    if (navigation.state.index !== undefined) {
      options.header = null
    }
    return options
  },
})

export default Navigator
