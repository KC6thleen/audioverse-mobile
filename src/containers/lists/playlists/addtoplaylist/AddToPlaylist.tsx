import React from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import { Track } from 'react-native-track-player'
import { Icon } from 'react-native-elements'
import throttle from 'lodash.throttle'
import { NavigationInjectedProps } from 'react-navigation'

import I18n from '../../../../../locales'
import {
  addPlaylistItem,
  removePlaylistItem,
} from '../../../../actions'

interface Item {
  [key: string]: any
}

interface Props extends NavigationInjectedProps {
  track: Track | undefined
  playlists: {}[]
  actions: {
    addPlaylistItem: typeof addPlaylistItem
    removePlaylistItem: typeof removePlaylistItem
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000030'
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    height: 300,

    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { height: 0, width: 0 },
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    height: 40
  },
  text: {
    marginLeft: 10
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
})

const AddToPlaylist: React.FC<Props> = ({ track, playlists, actions, navigation }) => {

  const handleOnPressNewPlaylist = () => {
    navigation.goBack()
    navigation.navigate({ routeName: 'NewPlaylist' })
  }

  const throttledAddPlaylistItem = throttle(actions.addPlaylistItem, 5000, { 'trailing': false })
  const throttledRemovePlaylistItem = throttle(actions.removePlaylistItem, 5000, { 'trailing': false })

  const handleOnPressPlaylist = (playlist: Item) => {
    if (!playlist.selected) {
      throttledAddPlaylistItem(playlist.id, track!)
    } else {
      throttledRemovePlaylistItem(playlist.id, track!.id)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ScrollView>
          <TouchableOpacity style={styles.row} onPress={handleOnPressNewPlaylist}>
            <Icon type="feather" name="list" size={18} />
            <Text style={styles.text}>{I18n.t('new_playlist')}</Text>
          </TouchableOpacity>
          {playlists.map((el: Item) => (
            <TouchableOpacity style={styles.row} key={el.id} onPress={() => { handleOnPressPlaylist(el) }}>
              <Icon type="feather" name={!el.selected ? 'square' : 'check-square'} size={18} />
              <Text style={styles.text}>{el.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.options}>
          <Button title={I18n.t('Ok').toUpperCase()} onPress={() => { navigation.goBack() }} />
        </View>
      </View>
    </View>
  )

}

export default AddToPlaylist
