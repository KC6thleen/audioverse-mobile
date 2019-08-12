import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { NavigationScreenProps, NavigationTabScreenOptions } from 'react-navigation'

import TabBarLabel from './tabbarlabel'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from '../styles'
import New from '../containers/recordings/new'
import Trending from '../containers/recordings/trending'
import Featured from '../containers/recordings/featured'
import Search from '../containers/search'

const PresentationsTabNavigator = createMaterialTopTabNavigator({
  New: {
    screen: New,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="new_presentations" />
    } as NavigationTabScreenOptions
  },
  Trendings: {
    screen: Trending,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="trending_presentations" />
    } as NavigationTabScreenOptions
  },
  Featured: {
    screen: Featured,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="featured_presentations" />
    } as NavigationTabScreenOptions
  },
}, {
  lazy: true,
  tabBarOptions: {
    style: GlobalStyles.tab,
    indicatorStyle: GlobalStyles.tabIndicator,
  },
})

const Navigator = createStackNavigator({
  PresentationsTabNavigator,
  Search,
}, {
  defaultNavigationOptions: ({ navigation }: NavigationScreenProps) => ({
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor,
    headerTitle: <HeaderTitle title="presentations" />,
    headerRight: <HeaderRight navigation={navigation} />,
  }),
})

export default Navigator
