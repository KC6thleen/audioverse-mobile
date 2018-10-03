import React from 'react'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'

import HeaderRightBibleVerses from './headerrightbibleverses'
import TabBarLabel from './tabbarlabel'
import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Books from 'src/containers/bible/books'
import Chapters from 'src/containers/bible/chapters'
import Verses from 'src/containers/bible/verses'

const BibleTab = createMaterialTopTabNavigator({
  BibleBooks: {
    screen: Books,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="books" />
    }
  },
  Chapters: {
    screen: Chapters,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="chapter" />
    }
  }
}, {
  lazy: true,
  tabBarOptions: {
    style: GlobalStyles.tab,
    indicatorStyle: GlobalStyles.tabIndicator
  }
})

const BibleStack = createStackNavigator({
  Verses: {
    screen: Verses,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
      headerTitle: <HeaderTitle title="bible" />,
      headerRight: <HeaderRightBibleVerses onPress={() => navigation.navigate('BibleTab')} />
    })
  },
  BibleTab: {
    screen: BibleTab
  }
}, {
  navigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor
  }
})

BibleStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked'
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed'
  }

  return {
    drawerLockMode
  }
}

export default BibleStack
