import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, TouchableOpacity, Text, Button, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import I18n from 'locales'

class AddToPlaylist extends PureComponent {

  handleOnPressNewPlaylist = () => {
    this.props.navigation.goBack()
    this.props.navigation.navigate({ routeName: 'NewPlaylist' })
  }

  handleOnPressPlaylist = (playlist) => {
    const { track, actions } = this.props
    if (!playlist.selected) {
      actions.addPlaylistItem(playlist.id, track)
    } else {
      actions.removePlaylistItem(playlist.id, track.id)
    }
  }

  render() {

    const { playlists } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <ScrollView>
            <TouchableOpacity style={styles.row} onPress={this.handleOnPressNewPlaylist}>
              <Icon name="list" size={18} />
              <Text style={styles.text}>{I18n.t('new_playlist')}</Text>
            </TouchableOpacity>
            {playlists.map(el => (
              <TouchableOpacity style={styles.row} key={el.id} onPress={() => { this.handleOnPressPlaylist(el) }}>
                <Icon name={!el.selected ? 'square' : 'check-square'} size={18} />
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
