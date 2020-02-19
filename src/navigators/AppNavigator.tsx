import React from 'react'
import { createSwitchNavigator, createAppContainer, NavigationInjectedProps } from 'react-navigation'
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
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
    headerTitle: () => <HeaderTitle title="discover" />,
    headerRight: () => <HeaderRight navigation={navigation} />,
  }),
})

const WithPlayerPresentationsNavigator = withPlayer(PresentationsNavigator)
const WithPlayerDiscoverNavigator = withPlayer(DiscoverNavigator)
const WithPlayerBibleNavigator = withPlayer(BibleNavigator)
const WithPlayerBooksNavigator = withPlayer(BooksNavigator)
const WithPlayerMenuNavigator = withPlayer(MenuNavigator)

const screenNavigationOptions = (title: string, icon: string) => ({
  tabBarIcon: ({ focused, horizontal, tintColor }: {[key: string]: any}) => {
    return <Icon type="feather" name={icon} size={25} color={tintColor} />
  },
  renderLabel: ({ tintColor }: {[key: string]: any}) => {
   return <BottomTabBarLabel tintColor={tintColor} title={title} />
  },
})

const BottomTabNavigator = createBottomTabNavigator({
  Presentations: {
    screen: WithPlayerPresentationsNavigator,
    navigationOptions: screenNavigationOptions('home', 'home'),
  },
  Discover: {
    screen: WithPlayerDiscoverNavigator,
    navigationOptions: screenNavigationOptions('discover', 'grid'),
  },
  Bible: {
    screen: WithPlayerBibleNavigator,
    navigationOptions: screenNavigationOptions('bible', 'book'),
  },
  Books: {
    screen: WithPlayerBooksNavigator,
    navigationOptions: screenNavigationOptions('books', 'book-open'),
  },
  Menu: {
    screen: WithPlayerMenuNavigator,
    navigationOptions: screenNavigationOptions('menu', 'menu'),
  },
}, {
  tabBarOptions: {
    activeTintColor: primaryColor,
  },
})

const PlayerStackNavigator = createStackNavigator({
  Player: {
    screen: Player,
    navigationOptions: {
      headerShown: false,
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
  mode: 'modal',
  headerMode: 'none',
  defaultNavigationOptions: {
    gestureEnabled: true,
    cardStyle: { backgroundColor: 'transparent' },
    ...TransitionPresets.ModalSlideFromBottomIOS
  },
})

const AppNavigator = createSwitchNavigator({
  Loading,
  Login,
  StackModalNavigator,
})

export default createAppContainer(AppNavigator)
