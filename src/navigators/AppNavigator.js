import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity, Easing, Animated } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator, TabNavigator, TabBarTop, DrawerNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'

import I18n from 'locales'
import { getLanguage, getBible } from 'src/reducers/selectors'
import IconButton from 'src/components/buttons/IconButton'
import CustomDrawerContent from 'src/components/drawer/CustomDrawerContent'
import Login from 'src/containers/login/Login'
import Signup from 'src/containers/signup/Signup'
import BibleBooks from 'src/containers/bible/books'
import BibleChapters from 'src/containers/bible/chapters'
import BibleVerses from 'src/containers/bible/verses'
import NewRecordings from 'src/containers/recordings/new'
import TrendingRecordings from 'src/containers/recordings/trending'
import FeaturedRecordings from 'src/containers/recordings/featured'
import Books from 'src/containers/books'
import Book from 'src/containers/books/book'
import Stories from 'src/containers/stories'
import Story from 'src/containers/stories/story'
import Presenters from 'src/containers/presenters'
import Presenter from 'src/containers/presenters/presenter'
import Conferences from 'src/containers/conferences'
import Conference from 'src/containers/conferences/conference'
import Sponsors from 'src/containers/sponsors'
import Sponsor from 'src/containers/sponsors/sponsor'
import Series from 'src/containers/series'
import Serie from 'src/containers/series/serie'
import Topics from 'src/containers/topics'
import Topic from 'src/containers/topics/topic'
import Settings from 'src/containers/settings'
import NowPlaying from 'src/containers/player'

const mapStateToProps = state => ({
  language: getLanguage(state)
})

const TabBarLabel = connect(mapStateToProps)(
  ({ language, tintColor, title }) => (
    <Text style={{color: tintColor, fontSize: 13, margin: 8, fontWeight: 'bold'}}>{I18n.t(title, {locale: language})}</Text>
  )
)

const HeaderTitle = connect(mapStateToProps)(
  ({ language, title }) => (
    <Text>{I18n.t(title, {locale: language})}</Text>
  )
)

const DrawerLabel = connect(mapStateToProps)(
  ({ language, tintColor, title }) => (
    <Text style={{margin: 16, fontWeight: 'bold', color: tintColor}}>{I18n.t(title, {locale: language})}</Text>
  )
)

const HeaderRightBibleVerses = connect(state => ({bible: getBible(state)}))(
  ({ onPress, bible }) => (
    <TouchableOpacity onPress={onPress} style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15}}>
      <Text style={{color: '#FFFFFF'}}>{bible.book}</Text>
      <Icon name="chevron-down" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  )
)

const AuthStack = StackNavigator({
  Login: Login,
  Signup: Signup
}, {
  headerMode: 'none'
})

const generateScreen = () => () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text></Text>
  </View>
)

const Bible = TabNavigator({
  Books: {screen: BibleBooks, navigationOptions: {tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="books" />}},
  Chapters: {screen: BibleChapters, navigationOptions: {tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="chapter" />}}
}, {
  tabBarOptions: {
    labelStyle: {
      color: '#FFFFFF',
      fontWeight: 'bold'
    },
    style: {
      backgroundColor: '#E53935'
    },
    indicatorStyle: {
      backgroundColor: '#FFFFFF'
    }
  },
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,
})

const Presentations = TabNavigator({
  New: {screen: NewRecordings, navigationOptions: {tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="new_presentations" />}},
  Trendings: {screen: TrendingRecordings, navigationOptions: {tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="trending_presentations" />}},
  Featured: {screen: FeaturedRecordings, navigationOptions: {tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="featured_presentations" />}}
}, {
  tabBarOptions: {
    labelStyle: {
      color: '#FFFFFF',
      fontWeight: 'bold'
    },
    style: {
      backgroundColor: '#E53935'
    },
    indicatorStyle: {
      backgroundColor: '#FFFFFF'
    }
  },
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,
})

const screenNavigationOptions = (title, icon) => ({
  title: <HeaderTitle title={title} />,
  drawerLabel: ({ tintColor }) => <DrawerLabel tintColor={tintColor} title={title} />,
  drawerIcon: ({ tintColor }) => <Icon name={icon} size={24} color={tintColor} />,
  headerRight: <IconButton onPress={() => {}} style={{paddingHorizontal: 15}} name="search" size={24} color="#FFFFFF" />
})

const AppDrawer = DrawerNavigator({
  MyLists: {screen: generateScreen(), navigationOptions: screenNavigationOptions('my_lists', 'list')},
  Presentations: {screen: Presentations, navigationOptions: screenNavigationOptions('presentations', 'mic')},
  BibleVerses: {screen: BibleVerses, navigationOptions: ({ navigation }) => ({
    ...screenNavigationOptions('bible', 'plus-square'),
    headerRight: <HeaderRightBibleVerses onPress={() => navigation.navigate('Bible')} />
  })},
  Books: {screen: Books, navigationOptions: screenNavigationOptions('books', 'book')},
  Stories: {screen: Stories, navigationOptions: screenNavigationOptions('stories', 'radio')},
  Presenters: {screen: Presenters, navigationOptions: screenNavigationOptions('presenters', 'user')},
  Conferences: {screen: Conferences, navigationOptions: screenNavigationOptions('conferences', 'layers')},
  Sponsors: {screen: Sponsors, navigationOptions: screenNavigationOptions('sponsors', 'users')},
  Series: {screen: Series, navigationOptions: screenNavigationOptions('series', 'tag')},
  Topics: {screen: Topics, navigationOptions: screenNavigationOptions('topics', 'target')},
  DownloadQueue: {screen: generateScreen(), navigationOptions: screenNavigationOptions('download_queue', 'download')},
  Settings: {screen: Settings, navigationOptions: screenNavigationOptions('settings', 'sliders')},
  About: {screen: generateScreen(), navigationOptions: screenNavigationOptions('about', 'info')}
}, {
  contentComponent: CustomDrawerContent,
  initialRouteName: 'Presentations'
})

const AppDrawerStack = StackNavigator({
  AppDrawer: AppDrawer
}, {
  headerMode: 'none',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: '#E53935', elevation: 0 },
    headerTintColor: '#FFFFFF',
    gesturesEnabled: false,
    headerLeft: <IconButton onPress={() => navigation.navigate('DrawerToggle')} style={{paddingHorizontal: 15}} name="menu" size={24} color="#FFFFFF" />
  })
})

const AppStack = StackNavigator({
  Auth: AuthStack,
  App: AppDrawerStack,
  Bible,
  Book,
  Story,
  Presenter,
  Conference,
  Sponsor,
  Serie,
  Topic
},{
  initialRouteName: 'App',
  navigationOptions: {
    headerBackTitle: null,
    headerStyle: {backgroundColor: '#E53935', elevation: 0},
    headerTintColor: '#FFFFFF'
  }
})

const AppNavigator = StackNavigator({
  AppStack,
  NowPlaying
},{
  headerMode: 'none',
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: true
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps
      const { index } = scene

      const height = layout.initHeight
      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      })

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      })

      return { opacity, transform: [{ translateY }] }
    },
  })
})

export default AppNavigator
