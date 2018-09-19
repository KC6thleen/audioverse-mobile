import React from 'react'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'

import TabBarLabel from './tabbarlabel'
import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import { GlobalStyles, headerTintColor } from 'src/styles'
import New from 'src/containers/recordings/new'
import Trending from 'src/containers/recordings/trending'
import Featured from 'src/containers/recordings/featured'

const PresentationsTab = createMaterialTopTabNavigator({
  New: {
    screen: New,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="new_presentations" />
    }
  },
  Trendings: {
    screen: Trending,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="trending_presentations" />
    }
  },
  Featured: {
    screen: Featured,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="featured_presentations" />
    }
  }
}, {
  lazy: true,
  tabBarOptions: {
    style: GlobalStyles.tab,
    indicatorStyle: GlobalStyles.tabIndicator
  }
})

const PresentationsStack = createStackNavigator({
  PresentationsTab: {
    screen: PresentationsTab,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
      headerTitle: <HeaderTitle title="presentations" />,
    })
  }
}, {
  navigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor
  }
})

PresentationsStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked'
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed'
  }

  return {
    drawerLockMode
  }
}

export default PresentationsStack
