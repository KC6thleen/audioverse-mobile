import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { NavigationTabScreenOptions } from 'react-navigation'

import HeaderRightBibleVerses from './headerrightbibleverses'
import TabBarLabel from './tabbarlabel'
import HeaderTitle from './headertitle'
import { GlobalStyles, headerTintColor } from '../styles'
import Books from '../containers/bible/books'
import Chapters from '../containers/bible/chapters'
import Verses from '../containers/bible/verses'

const BibleTabsNavigator = createMaterialTopTabNavigator({
  BibleBooks: {
    screen: Books,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="books" />
    } as NavigationTabScreenOptions
  },
  Chapters: {
    screen: Chapters,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="chapters" />
    } as NavigationTabScreenOptions
  },
  Verses: {
    screen: Verses,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="verses" />
    } as NavigationTabScreenOptions
  }
}, {
  initialRouteName: 'Verses',
  lazy: true,
  tabBarOptions: {
    style: GlobalStyles.tab,
    indicatorStyle: GlobalStyles.tabIndicator,
  },
})

const Navigator = createStackNavigator({
  BibleTabsNavigator: {
    screen: BibleTabsNavigator,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title="bible" />,
      headerRight: <HeaderRightBibleVerses />,
    }),
  }
}, {
  defaultNavigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor,
  },
})

export default Navigator
