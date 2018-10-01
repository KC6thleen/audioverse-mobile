import React from 'react'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'

import TabBarLabel from './tabbarlabel'
import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Downloads from 'src/containers/lists/downloads'
import Trending from 'src/containers/recordings/trending'
import Featured from 'src/containers/recordings/featured'

const ListsTab = createMaterialTopTabNavigator({
  Downloads: {
    screen: Downloads,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="downloads" />
    }
  }
}, {
  lazy: true,
  tabBarOptions: {
    style: GlobalStyles.tab,
    indicatorStyle: GlobalStyles.tabIndicator
  }
})

const ListsStack = createStackNavigator({
  ListsTab: {
    screen: ListsTab,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
      headerTitle: <HeaderTitle title="my_lists" />,
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
