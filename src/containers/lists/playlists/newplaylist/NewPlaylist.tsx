import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native'
import Toast from 'react-native-simple-toast'
import { NavigationScreenProps } from 'react-navigation'

import I18n from '../../../../../locales'
import { addPlaylist } from '../../../../actions'

interface Props extends NavigationScreenProps {
  actions: {
    addPlaylist: typeof addPlaylist
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
  },
  ok: {
    marginLeft: 20
  }
})

const NewPlaylist: React.FC<Props> = ({ navigation, actions }) => {

  const [isPublic, setIsPublic] = useState(true)
  const [name, setName] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{I18n.t('new_playlist')}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          placeholder={I18n.t('title')}
          accessibilityLabel={I18n.t('title')}
          autoFocus />
        <View style={styles.public}>
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            accessibilityLabel={I18n.t('is_public')} />
          <Text style={styles.publicText}>{I18n.t('is_public')}</Text>
        </View>
        <View style={styles.options}>
          <TouchableOpacity style={styles.ok}>
            <Button
              title={I18n.t('Cancel').toUpperCase()}
              onPress={() => { navigation.goBack() }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.ok}>
            <Button
              title={I18n.t('Ok').toUpperCase()}
              disabled={name === ''}
              onPress={() => {
                actions.addPlaylist({ title: name, public: isPublic })
                navigation.goBack()
                Toast.show(I18n.t('added_to_playlist'))
              }} />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )

}

export default NewPlaylist
