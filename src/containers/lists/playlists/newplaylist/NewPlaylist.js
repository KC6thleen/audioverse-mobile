import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, Button, Switch, StyleSheet } from 'react-native'
import Toast from 'react-native-simple-toast'

import I18n from 'locales'

class NewPlaylist extends PureComponent {

  state = {
    isPublic: true,
    name: ''
  }

  setPublic = value => {
    this.setState({ isPublic: value })
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{I18n.t('new_playlist')}</Text>
          <TextInput
            style={styles.input}
            value={this.state.name}
            onChangeText={text => this.setState({...this.state, name: text})}
            placeholder={I18n.t('title')}
            autoFocus />
          <View style={styles.public}>
            <Switch
              value={this.state.isPublic}
              onValueChange={this.setPublic} />
            <Text style={styles.publicText}>{I18n.t('is_public')}</Text>
          </View>
          <View style={styles.options}>
            <Button
              title={I18n.t('Cancel').toUpperCase()}
              onPress={() => { this.props.navigation.goBack() }} />
            <Button
              title={I18n.t('Ok').toUpperCase()}
              disabled={this.state.name === ''}
              onPress={() => {
                this.props.actions.addPlaylist({ title: this.state.name, public: this.state.isPublic })
                this.props.navigation.goBack()
                Toast.show(I18n.t('added_to_playlist'))
              }} />
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

    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { height: 0, width: 0 },
    elevation: 2,
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#007AFF',
    width: 220,
  },
  public: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  publicText: {
    lineHeight: 30,
    marginLeft: 5
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20
  }
})

NewPlaylist.propTypes = {
  actions: PropTypes.shape({
    addPlaylist: PropTypes.func.isRequired
  })
}

export default NewPlaylist
