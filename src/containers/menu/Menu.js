import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  FlatList,
} from 'react-native'
import { ListItem } from 'react-native-elements'

import I18n from 'locales'

class Menu extends PureComponent {

  handlePress = (item) => {
    this.props.navigation.navigate({routeName: item.routeName})
  }

  get data() {
    return [
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
  }

  render() {

    return (
      <View>
        <FlatList
          data={this.data}
          keyExtractor={item => item.title}
          renderItem={
            ({item}) => 
              <ListItem
                leftIcon={{type: 'feather', name: item.icon}}
                title={I18n.t(item.title, {locale: this.props.language})}
                onPress={() => { this.handlePress(item) }}
                chevron
                bottomDivider />
          }
        />
      </View>
    )
  }

}

Menu.propTypes = {
  navigation: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
}

export default Menu
