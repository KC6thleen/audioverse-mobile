import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import HeaderRightBibleVerses from './headerrightbibleverses'
import TabBarLabel from './tabbarlabel'
import HeaderTitle from './headertitle'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Books from 'src/containers/bible/books'
import Chapters from 'src/containers/bible/chapters'
import Verses from 'src/containers/bible/verses'

const BibleTabsNavigator = createMaterialTopTabNavigator({
  BibleBooks: {
    screen: Books,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="books" />
    }
  },
  Chapters: {
    screen: Chapters,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="chapters" />
    }
  },
  Verses: {
    screen: Verses,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="verses" />
    }
  }
}, {
  initialRouteName: 'Verses',
  lazy: true,
  tabBarOptions: {
    style: GlobalStyles.tab,
    indicatorStyle: GlobalStyles.tabIndicator
  }
})

const Navigator = createStackNavigator({
  BibleTabsNavigator: {
    screen: BibleTabsNavigator,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderTitle title="bible" />,
      headerRight: <HeaderRightBibleVerses />
    })
  }
}, {
  defaultNavigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor
  },
})

export default Navigator
