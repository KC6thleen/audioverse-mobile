import React from 'react'
import {
  Easing,
  Animated,
} from 'react-native'
import { createSwitchNavigator, createAppContainer, NavigationInjectedProps } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Icon } from 'react-native-elements'

import { GlobalStyles, headerTintColor, primaryColor } from '../styles'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import BottomTabBarLabel from './bottomtabbarlabel'
import withPlayer from '../HOCs/withPlayer'
import Loading from '../containers/auth/loading'
import Login from '../containers/auth/login'
import Discover from '../containers/discover'
import Post from '../containers/blog/post'
import PresentationsNavigator from './PresentationsNavigator'
import BibleNavigator from './BibleNavigator'
import BooksNavigator from './BooksNavigator'
import MenuNavigator from './MenuNavigator'
import Player from '../containers/player'
import Transcript from '../containers/player/transcript'
import VideoPlayer from '../containers/player/Video'
import AddToPlaylist from '../containers/lists/playlists/addtoplaylist'
import NewPlaylist from '../containers/lists/playlists/newplaylist'
import Presenter from '../containers/presenters/presenter'
import Conference from '../containers/conferences/conference'
import Sponsor from '../containers/sponsors/sponsor'
import Serie from '../containers/series/serie'
import SearchNavigator from './SearchNavigator'

const DiscoverNavigator = createStackNavigator({
  Discover,
  SearchNavigator,
  Post,
  Conference,
  Sponsor,
  Serie,
},{
  defaultNavigationOptions: ({ navigation }: NavigationInjectedProps) => ({
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor,
    headerTitle: <HeaderTitle title="discover" />,
    headerRight: <HeaderRight navigation={navigation} />,
  }),
})

const WithPlayerPresentationsNavigator = withPlayer(PresentationsNavigator)
const WithPlayerDiscoverNavigator = withPlayer(DiscoverNavigator)
const WithPlayerBibleNavigator = withPlayer(BibleNavigator)
const WithPlayerBooksNavigator = withPlayer(BooksNavigator)
const WithPlayerMenuNavigator = withPlayer(MenuNavigator)

const screenNavigationOptions = (title: string, icon: string) => ({
  tabBarIcon: ({ focused, horizontal, tintColor }: {[key: string]: any}) => {
    return <Icon type="material" name={icon} size={25} color={tintColor} />
  },
  renderLabel: ({ route, focused, color }: {[key: string]: any}) => {
   return <BottomTabBarLabel tintColor={color} title={title} />
  },
})

const BottomTabNavigator = createMaterialBottomTabNavigator({
  Presentations: {
    screen: WithPlayerPresentationsNavigator,
    navigationOptions: screenNavigationOptions('home', 'home'),
  },
  Discover: {
    screen: WithPlayerDiscoverNavigator,
    navigationOptions: screenNavigationOptions('discover', 'view-carousel'),
  },
  Bible: {
    screen: WithPlayerBibleNavigator,
    navigationOptions: screenNavigationOptions('bible', 'add-box'),
  },
  Books: {
    screen: WithPlayerBooksNavigator,
    navigationOptions: screenNavigationOptions('books', 'book'),
  },
  Menu: {
    screen: WithPlayerMenuNavigator,
    navigationOptions: screenNavigationOptions('menu', 'menu'),
  },
}, {
  activeColor: primaryColor,
  barStyle: {
    backgroundColor: '#FFF',
  },
})

const PlayerStackNavigator = createStackNavigator({
  Player: {
    screen: Player,
    navigationOptions: {
      header: null,
    },
  },
  Transcript,
  Sponsor,
  Presenter,
  Conference,
  Serie,
},{
  defaultNavigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor,
  },
})

const StackModalNavigator = createStackNavigator({
  Home: BottomTabNavigator,
  Player: PlayerStackNavigator,
  VideoPlayer,
  AddToPlaylist,
  NewPlaylist,
},{
  transparentCard: true,
  mode: 'modal',
  headerMode: 'none',
  defaultNavigationOptions: {
    gesturesEnabled: true,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: (sceneProps: {[key: string]: any}) => {
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

const AppNavigator = createSwitchNavigator({
  Loading,
  Login,
  StackModalNavigator,
})

export default createAppContainer(AppNavigator)
