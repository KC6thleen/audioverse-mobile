import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { NavigationInjectedProps } from 'react-navigation'

import TabBarLabel from './tabbarlabel'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from '../styles'
import Favorites from '../containers/lists/favorites'
import Playlists from '../containers/lists/playlists'
import History from '../containers/lists/history'
import PlaylistItems from '../containers/lists/playlists/playlistitems'

interface TabBarLabelProps {
  tintColor: string
}

const ListsTab = createMaterialTopTabNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="favorites" />
    }
  },
  Playlists: {
    screen: Playlists,
    navigationOptions: {
      tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="playlists" />
    }
  },
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: ({ tintColor }: TabBarLabelProps) => <TabBarLabel tintColor={tintColor} title="history" />
    }
  }
}, {
  lazy: true,
  tabBarOptions: {
    style: GlobalStyles.tab,
    scrollEnabled: true,
    indicatorStyle: GlobalStyles.tabIndicator,
  },
})

const Navigator = createStackNavigator({
  ListsTab: {
    screen: ListsTab,
    navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
      headerTitle: () => <HeaderTitle title="my_lists" />,
      headerRight: () => <HeaderRight navigation={navigation} />,
    }),
  },
  PlaylistItems: {
    screen: PlaylistItems,
    navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
      title: navigation.state.params ? navigation.state.params.title : '',
    }),
  },
}, {
  defaultNavigationOptions: ({ navigation }: NavigationInjectedProps) => {
    const options: {[key: string]: any}  = {
      headerStyle: GlobalStyles.header,
      headerTintColor: headerTintColor,
    }
    if (navigation.state.index !== undefined) {
      options.headerShown = false
    }
    return options
  },
})

export default Navigator
