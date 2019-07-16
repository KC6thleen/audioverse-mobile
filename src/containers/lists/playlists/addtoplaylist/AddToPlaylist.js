import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, TouchableOpacity, Text, Button, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import throttle from 'lodash.throttle'

import I18n from 'locales'

class AddToPlaylist extends React.PureComponent {

  handleOnPressNewPlaylist = () => {
    this.props.navigation.goBack()
    this.props.navigation.navigate({ routeName: 'NewPlaylist' })
  }

  throttledAddPlaylistItem = throttle(this.props.actions.addPlaylistItem, 5000, { 'trailing': false })
  throttledRemovePlaylistItem = throttle(this.props.actions.removePlaylistItem, 5000, { 'trailing': false })

  handleOnPressPlaylist = (playlist) => {
    const { track } = this.props
    if (!playlist.selected) {
      this.throttledAddPlaylistItem(playlist.id, track)
    } else {
      this.throttledRemovePlaylistItem(playlist.id, track.id)
    }
  }

  render() {

    const { playlists } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <ScrollView>
            <TouchableOpacity style={styles.row} onPress={this.handleOnPressNewPlaylist}>
              <Icon type="feather" name="list" size={18} />
              <Text style={styles.text}>{I18n.t('new_playlist')}</Text>
            </TouchableOpacity>
            {playlists.map(el => (
              <TouchableOpacity style={styles.row} key={el.id} onPress={() => { this.handleOnPressPlaylist(el) }}>
                <Icon type="feather" name={!el.selected ? 'square' : 'check-square'} size={18} />
                <Text style={styles.text}>{el.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.options}>
            <Button title={I18n.t('Ok').toUpperCase()} onPress={() => { this.props.navigation.goBack() }} />
          </View>
        </View>
      </View>
    )
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
    marginTop: 20
  }
})

AddToPlaylist.propTypes = {
  track: PropTypes.object.isRequired,
  playlists: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    addPlaylistItem: PropTypes.func.isRequired,
    removePlaylistItem: PropTypes.func.isRequired
  })
}

export default AddToPlaylist
