import React from 'react'
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation'

import TabBarLabel from './tabbarlabel'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from 'src/styles'
import New from 'src/containers/recordings/new'
import Trending from 'src/containers/recordings/trending'
import Featured from 'src/containers/recordings/featured'
import Search from 'src/containers/search'

const PresentationsTabNavigator = createMaterialTopTabNavigator({
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

const Navigator = createStackNavigator({
  PresentationsTabNavigator,
  Search,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor,
    headerTitle: <HeaderTitle title="presentations" />,
    headerRight: <HeaderRight navigation={navigation} />,
  }),
})

export default Navigator
