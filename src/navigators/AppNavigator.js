import React from 'react'
import { View, Easing, Animated } from 'react-native'
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'

import { GlobalStyles, headerTintColor } from 'src/styles'
import CustomDrawerContent from './drawer/CustomDrawerContent'
import DrawerLabel from './drawer/drawerlabel'
import Loading from 'src/containers/auth/loading'
import Login from 'src/containers/auth/login'
import BibleNavigator from './BibleNavigator'
import ListsNavigator from './ListsNavigator'
import ScriptureSongsNavigator from './ScriptureSongsNavigator'
import PresentationsNavigator from './PresentationsNavigator'
import BooksNavigator from './BooksNavigator'
import StoriesNavigator from './StoriesNavigator'
import PresentersNavigator from './PresentersNavigator'
import ConferencesNavigator from './ConferencesNavigator'
import SponsorsNavigator from './SponsorsNavigator'
import SeriesNavigator from './SeriesNavigator'
import TopicsNavigator from './TopicsNavigator'
import SettingsNavigator from './SettingsNavigator'
import DownloadsQueueNavigator from './DownloadsQueueNavigator'
import Player from 'src/containers/player'
import VideoPlayer from 'src/containers/player/Video'
import AddToPlaylist from 'src/containers/lists/playlists/addtoplaylist'
import NewPlaylist from 'src/containers/lists/playlists/newplaylist'
import AboutNavigator from './AboutNavigator'
import Search from 'src/containers/search'
import Sponsor from 'src/containers/sponsors/sponsor'
import Presenter from 'src/containers/presenters/presenter'
import Conference from 'src/containers/conferences/conference'
import Serie from 'src/containers/series/serie'

const screenNavigationOptions = (title, icon) => ({
  drawerLabel: ({ tintColor }) => <DrawerLabel tintColor={tintColor} title={title} />,
  drawerIcon: ({ tintColor }) => <Icon name={icon} size={24} color={tintColor} />
})

const AppDrawer = createDrawerNavigator({
  MyLists: {screen: ListsNavigator, navigationOptions: screenNavigationOptions('my_lists', 'list')},
  Presentations: {screen: PresentationsNavigator, navigationOptions: screenNavigationOptions('presentations', 'headphones')},
  Bible: {screen: BibleNavigator, navigationOptions: screenNavigationOptions('bible', 'bookmark')},
  ScriptureSongs: {screen: ScriptureSongsNavigator, navigationOptions: screenNavigationOptions('Scripture_Songs', 'music')},
  Books: {screen: BooksNavigator, navigationOptions: screenNavigationOptions('books', 'book')},
  Stories: {screen: StoriesNavigator, navigationOptions: screenNavigationOptions('stories', 'feather')},
  Presenters: {screen: PresentersNavigator, navigationOptions: screenNavigationOptions('presenters', 'user')},
  Conferences: {screen: ConferencesNavigator, navigationOptions: screenNavigationOptions('conferences', 'calendar')},
  Sponsors: {screen: SponsorsNavigator, navigationOptions: screenNavigationOptions('sponsors', 'users')},
  Series: {screen: SeriesNavigator, navigationOptions: screenNavigationOptions('series', 'package')},
  Topics: {screen: TopicsNavigator, navigationOptions: screenNavigationOptions('topics', 'folder')},
  DownloadsQueue: {screen: DownloadsQueueNavigator, navigationOptions: screenNavigationOptions('download_queue', 'download')},
  Settings: {screen: SettingsNavigator, navigationOptions: screenNavigationOptions('settings', 'sliders')},
  About: {screen: AboutNavigator, navigationOptions: screenNavigationOptions('about', 'info')}
}, {
  contentComponent: CustomDrawerContent,
  initialRouteName: 'Presentations'
})

const AppStack = createStackNavigator({
  AppDrawer: {
    screen: AppDrawer,
    navigationOptions: {
      header: null
    }
  },
  Search,
  Sponsor,
  Presenter,
  Conference,
  Serie
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor,
    title: navigation.state.params ? navigation.state.params.title : ''
  })
})

const AppNavigator = createStackNavigator({
  Loading,
  Login,
  AppStack,
  Player,
  VideoPlayer,
  AddToPlaylist,
  NewPlaylist
},{
  initialRouteName: 'Loading',
  transparentCard: true,
  mode: 'modal',
  headerMode: 'none',
  defaultNavigationOptions: {
    gesturesEnabled: true,
    gestureResponseDistance: {
      vertical: 400
    }
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
        inputRange: [index - 1, index - 0.10, index],
        outputRange: [0, 1, 1],
      })

      return { opacity, transform: [{ translateY }] }
    },
  })
})

export default createAppContainer(AppNavigator)
