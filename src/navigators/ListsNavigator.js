import React from 'react'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'

import TabBarLabel from './tabbarlabel'
import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Downloads from 'src/containers/lists/downloads'
import Favorites from 'src/containers/lists/favorites'
import Playlists from 'src/containers/lists/playlists'
import History from 'src/containers/lists/history'
import PlaylistItems from 'src/containers/lists/playlists/playlistitems'

const ListsTab = createMaterialTopTabNavigator({
  Downloads: {
    screen: Downloads,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="downloads" />
    }
  },
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

const ListsStack = createStackNavigator({
  ListsTab: {
    screen: ListsTab,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
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
  navigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor
  }
})

ListsStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked'
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed'
  }

  return {
    drawerLockMode
  }
}

export default ListsStack
