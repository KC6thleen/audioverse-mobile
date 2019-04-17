import React from 'react'
import { createStackNavigator } from 'react-navigation'

import { GlobalStyles, headerTintColor } from 'src/styles'
import Menu from 'src/containers/menu'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import Downloads from 'src/containers/lists/downloads'
import MyListsNavigator from './ListsNavigator'
import ScriptureSongsNavigator from './ScriptureSongsNavigator'
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
import DownloadsQueue from 'src/containers/downloadsqueue'
import Settings from 'src/containers/settings'
import About from 'src/containers/about'
import Search from 'src/containers/search'

Menu.params = {
  title: 'menu',
}
Downloads.params = {
  title: 'downloads',
}
MyListsNavigator.params = {
  title: 'my_lists',
}
MyListsNavigator.navigationOptions = ({ navigation }) => {
  const options  = {}
  if (navigation.state.index > 0) {
    options.header = null
  }
  return options
}
ScriptureSongsNavigator.params = {
  title: 'Scripture_Songs',
}
ScriptureSongsNavigator.navigationOptions = ({ navigation }) => {
  const options  = {}
  if (navigation.state.index > 0) {
    options.header = null
  }
  return options
}
Stories.params = {
  title: 'stories',
}
Story.navigationOptions = ({ navigation }) => ({
  headerTitle: null,
  title: navigation.state.params ? navigation.state.params.title : '',
})
Presenters.params = {
  title: 'presenters',
}
Presenter.navigationOptions = ({ navigation }) => ({
  headerTitle: null,
  title: navigation.state.params ? navigation.state.params.title : '',
})
Conferences.params = {
  title: 'conferences',
}
Conference.navigationOptions = ({ navigation }) => ({
  headerTitle: null,
  title: navigation.state.params ? navigation.state.params.title : '',
})
Sponsors.params = {
  title: 'sponsors',
}
Sponsor.navigationOptions = ({ navigation }) => ({
  headerTitle: null,
  title: navigation.state.params ? navigation.state.params.title : '',
})
Series.params = {
  title: 'series',
}
Serie.navigationOptions = ({ navigation }) => ({
  headerTitle: null,
  title: navigation.state.params ? navigation.state.params.title : '',
})
Topics.params = {
  title: 'topics',
}
Topic.navigationOptions = ({ navigation }) => ({
  headerTitle: null,
  title: navigation.state.params ? navigation.state.params.title : '',
})
DownloadsQueue.params = {
  title: 'download_queue',
}
Settings.params = {
  title: 'settings',
}
About.params = {
  title: 'about',
}

const Navigator = createStackNavigator({
  Menu,
  Downloads,
  MyLists: MyListsNavigator,
  ScriptureSongs: ScriptureSongsNavigator,
  Stories,
  Story,
  Presenters,
  Presenter,
  Conferences,
  Conference,
  Sponsors,
  Sponsor,
  Series,
  Serie,
  Topics,
  Topic,
  DownloadsQueue,
  Settings,
  About,
  Search,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor,
    headerTitle: <HeaderTitle title={navigation.state.params ? navigation.state.params.title : ''} />,
    headerRight: <HeaderRight navigation={navigation} />,
  }),
})

export default Navigator
