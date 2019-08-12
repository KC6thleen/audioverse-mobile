import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { NavigationScreenProps } from 'react-navigation'

import { GlobalStyles, headerTintColor } from '../styles'
import Menu from '../containers/menu'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import Downloads from '../containers/lists/downloads'
import MyListsNavigator from './ListsNavigator'
import ScriptureSongsNavigator from './ScriptureSongsNavigator'
import Stories from '../containers/stories'
import Story from '../containers/stories/story'
import Presenters from '../containers/presenters'
import Presenter from '../containers/presenters/presenter'
import Conferences from '../containers/conferences'
import Conference from '../containers/conferences/conference'
import Sponsors from '../containers/sponsors'
import Sponsor from '../containers/sponsors/sponsor'
import Series from '../containers/series'
import Serie from '../containers/series/serie'
import Topics from '../containers/topics'
import Topic from '../containers/topics/topic'
import DownloadsQueue from '../containers/downloadsqueue'
import Settings from '../containers/settings'
import About from '../containers/about'
import Search from '../containers/search'

MyListsNavigator.params = {
  title: 'my_lists',
}
MyListsNavigator.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  const options: {[key: string]: any} = {}
  if (navigation.state.index > 0) {
    options.header = null
  }
  return options
}

ScriptureSongsNavigator.params = {
  title: 'Scripture_Songs',
}
ScriptureSongsNavigator.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  const options: {[key: string]: any} = {}
  if (navigation.state.index > 0) {
    options.header = null
  }
  return options
}

const navigationOptionsFunction = ({ navigation }: NavigationScreenProps) => ({
  headerTitle: null,
  title: navigation.state.params ? navigation.state.params.title : '',
})

const Navigator = createStackNavigator({
  Menu: {
    screen: Menu,
    params: {
      title: 'menu',
    },
  },
  Downloads: {
    screen: Downloads,
    params: {
      title: 'downloads',
    },
  },
  MyLists: MyListsNavigator,
  ScriptureSongs: ScriptureSongsNavigator,
  Stories: {
    screen: Stories,
    params: {
      title: 'stories',
    },
  },
  Story: {
    screen: Story,
    navigationOptions: navigationOptionsFunction,
  },
  Presenters: {
    screen: Presenters,
    params: {
      title: 'presenters',
    },
  },
  Presenter: {
    screen: Presenter,
    navigationOptions: navigationOptionsFunction,
  },
  Conferences: {
    screen: Conferences,
    params: {
      title: 'conferences',
    },
  },
  Conference: {
    screen: Conference,
    navigationOptions: navigationOptionsFunction,
  },
  Sponsors: {
    screen: Sponsors,
    params: {
      title: 'sponsors',
    },
  },
  Sponsor: {
    screen: Sponsor,
    navigationOptions: navigationOptionsFunction,
  },
  Series: {
    screen: Series,
    params: {
      title: 'series',
    },
  },
  Serie: {
    screen: Serie,
    navigationOptions: navigationOptionsFunction,
  },
  Topics: {
    screen: Topics,
    params: {
      title: 'topics',
    },
  },
  Topic: {
    screen: Topic,
    navigationOptions: navigationOptionsFunction,
  },
  DownloadsQueue: {
    screen: DownloadsQueue,
    params: {
      title: 'download_queue',
    },
  },
  Settings: {
    screen: Settings,
    params: {
      title: 'settings',
    },
  },
  About: {
    screen: About,
    params: {
      title: 'about',
    },
  },
  Search,
}, {
  defaultNavigationOptions: ({ navigation }: NavigationScreenProps) => ({
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor,
    headerTitle: <HeaderTitle title={navigation.state.params ? navigation.state.params.title : ''} />,
    headerRight: <HeaderRight navigation={navigation} />,
  }),
})

export default Navigator
