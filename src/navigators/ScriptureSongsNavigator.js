import React from 'react'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'

import TabBarLabel from './tabbarlabel'
import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Tags from 'src/containers/scripturesongs/tags'
import Tag from 'src/containers/scripturesongs/tags/tag'
import TagsBooks from 'src/containers/scripturesongs/tagsBooks'
import TagBook from 'src/containers/scripturesongs/tagsBooks/tagBook'
import TagsAlbums from 'src/containers/scripturesongs/tagsAlbums'
import TagAlbum from 'src/containers/scripturesongs/tagsAlbums/tagAlbum'
import TagsSponsors from 'src/containers/scripturesongs/tagsSponsors'
import TagSponsor from 'src/containers/scripturesongs/tagsSponsors/tagSponsor'

const ScriptureSongsTab = createMaterialTopTabNavigator({
  TagsBooks: {
    screen: TagsBooks,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="books" />
    }
  },
  TagsAlbums: {
    screen: TagsAlbums,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="Albums" />
    }
  },
  TagsSponsors: {
    screen: TagsSponsors,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="sponsors" />
    }
  },
  Tags: {
    screen: Tags,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => <TabBarLabel tintColor={tintColor} title="Tags" />
    }
  }
}, {
  lazy: true,
  tabBarOptions: {
    style: GlobalStyles.tab,
    scrollEnabled: true,
    indicatorStyle: GlobalStyles.tabIndicator
  }
})

const ScriptureSongsStack = createStackNavigator({
  ScriptureSongsTab: {
    screen: ScriptureSongsTab,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
      headerTitle: <HeaderTitle title="Scripture_Songs" />,
      headerRight: <HeaderRight navigation={navigation} />
    })
  },
  TagBook: {
    screen: TagBook,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title
    })
  },
  TagAlbum: {
    screen: TagAlbum,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title
    })
  },
  TagSponsor: {
    screen: TagSponsor,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title
    })
  },
  Tag: {
    screen: Tag,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title
    })
  }
}, {
  defaultNavigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor
  },
  navigationOptions: ({ navigation }) => {
    let drawerLockMode = 'unlocked'
    if (navigation.state.index > 0) {
      drawerLockMode = 'locked-closed'
    }
  
    return {
      drawerLockMode
    }
  }
})

export default ScriptureSongsStack
