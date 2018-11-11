import React from 'react'
import { View, Easing, Animated } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'

import CustomDrawerContent from './drawer/CustomDrawerContent'
import DrawerLabel from './drawer/drawerlabel'
import Loading from 'src/containers/auth/loading'
import Login from 'src/containers/auth/login'
import BibleNavigator from './BibleNavigator'
import ListsNavigator from './ListsNavigator'
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

const generateScreen = () => () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} />
)

const screenNavigationOptions = (title, icon) => ({
  drawerLabel: ({ tintColor }) => <DrawerLabel tintColor={tintColor} title={title} />,
  drawerIcon: ({ tintColor }) => <Icon name={icon} size={24} color={tintColor} />
})

const AppDrawer = createDrawerNavigator({
  MyLists: {screen: ListsNavigator, navigationOptions: screenNavigationOptions('my_lists', 'list')},
  Presentations: {screen: PresentationsNavigator, navigationOptions: screenNavigationOptions('presentations', 'mic')},
  Bible: {screen: BibleNavigator, navigationOptions: screenNavigationOptions('bible', 'plus-square')},
  Books: {screen: BooksNavigator, navigationOptions: screenNavigationOptions('books', 'book')},
  Stories: {screen: StoriesNavigator, navigationOptions: screenNavigationOptions('stories', 'radio')},
  Presenters: {screen: PresentersNavigator, navigationOptions: screenNavigationOptions('presenters', 'user')},
  Conferences: {screen: ConferencesNavigator, navigationOptions: screenNavigationOptions('conferences', 'layers')},
  Sponsors: {screen: SponsorsNavigator, navigationOptions: screenNavigationOptions('sponsors', 'users')},
  Series: {screen: SeriesNavigator, navigationOptions: screenNavigationOptions('series', 'tag')},
  Topics: {screen: TopicsNavigator, navigationOptions: screenNavigationOptions('topics', 'target')},
  DownloadsQueue: {screen: DownloadsQueueNavigator, navigationOptions: screenNavigationOptions('download_queue', 'download')},
  Settings: {screen: SettingsNavigator, navigationOptions: screenNavigationOptions('settings', 'sliders')},
  About: {screen: generateScreen(), navigationOptions: screenNavigationOptions('about', 'info')}
}, {
  contentComponent: CustomDrawerContent,
  initialRouteName: 'Presentations'
})

const AppNavigator = createStackNavigator({
  Loading,
  Login,
  AppDrawer,
  Player,
  VideoPlayer,
  AddToPlaylist,
  NewPlaylist
},{
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'Loading',
  navigationOptions: {
    gesturesEnabled: true
  },
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1,
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
