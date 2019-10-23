import React from 'react'
import {
  View,
  FlatList,
} from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { ListItem } from 'react-native-elements'

import I18n from '../../../locales'

interface Item {
  title: string
  routeName: string
  icon: string
}

const data: Item[] = [
  {
    title: 'downloads',
    routeName: 'Downloads',
    icon: 'download-cloud',
  },
  {
    title: 'my_lists',
    routeName: 'MyLists',
    icon: 'list',
  },
  {
    title: 'Scripture_Songs',
    routeName: 'ScriptureSongs',
    icon: 'music',
  },
  {
    title: 'stories',
    routeName: 'Stories',
    icon: 'feather',
  },
  {
    title: 'presenters',
    routeName: 'Presenters',
    icon: 'user',
  },
  {
    title: 'conferences',
    routeName: 'Conferences',
    icon: 'calendar',
  },
  {
    title: 'sponsors',
    routeName: 'Sponsors',
    icon: 'users',
  },
  {
    title: 'series',
    routeName: 'Series',
    icon: 'package',
  },
  {
    title: 'topics',
    routeName: 'Topics',
    icon: 'folder',
  },
  {
    title: 'download_queue',
    routeName: 'DownloadsQueue',
    icon: 'download',
  },
  {
    title: 'settings',
    routeName: 'Settings',
    icon: 'settings',
  },
  {
    title: 'about',
    routeName: 'About',
    icon: 'info',
  },
]

interface Props extends NavigationInjectedProps {
  language: string
}

const Menu: React.FC<Props> = ({ navigation, language }) => {

  const handlePress = (item: Item) => {
    navigation.navigate({routeName: item.routeName})
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.title}
        renderItem={
          ({item}) => 
            <ListItem
              leftIcon={{type: 'feather', name: item.icon}}
              title={I18n.t(item.title, {locale: language})}
              onPress={() => { handlePress(item) }}
              chevron
              bottomDivider />
        }
      />
    </View>
  )

}

export default Menu
