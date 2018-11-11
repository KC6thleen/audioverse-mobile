import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import ActionSheet from 'react-native-action-sheet'

import I18n from 'locales'

const bibles = [
  {
    id: 'ENGESV2',
    name: '2001 English Standard',
    abbr: 'ESV'
  },
  {
    id: 'ENGKJV1',
    name: 'King James Version',
    abbr: 'KJV'
  },
  {
    id: 'ENGKJV2',
    name: 'King James Version (Dramatized)',
    abbr: 'KJV(D)'
  }
]

const HeaderRightBibleVerses = ({ navigation, bible, actions }) => {
  const handleOnPressVersion = () => {
    const options = bibles.map(el => el.name)
    options.push(I18n.t('Cancel'))

    ActionSheet.showActionSheetWithOptions({
      title: '',
      options: options,
      cancelButtonIndex: options.length - 1,
    }, async (buttonIndex) => {
      if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
        if (bible.version.id !== bibles[buttonIndex].id) {
          actions.setBibleVersion(bibles[buttonIndex])
        }
      }
    })
  }

  const handleOnPressBook = () => {
    navigation.navigate('BibleTab')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.container, styles.option]}
        onPress={handleOnPressVersion}>
        <Text style={{color: '#FFFFFF'}}>{bible.version.abbr}</Text>
        <Icon name="chevron-down" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.container, styles.option]}
        onPress={handleOnPressBook}>
        <Text style={{color: '#FFFFFF'}}>{bible.book}</Text>
        <Icon name="chevron-down" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  option: {
    paddingHorizontal: 10
  }
})

HeaderRightBibleVerses.propTypes = {
  navigation: PropTypes.object.isRequired,
  bible: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    setBibleVersion: PropTypes.func.isRequired,
    resetAndPlayTrack: PropTypes.func.isRequired
  })
}

export default HeaderRightBibleVerses
