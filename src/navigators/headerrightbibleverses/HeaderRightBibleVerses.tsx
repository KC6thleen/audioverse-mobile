import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import { Icon } from 'react-native-elements'
import ActionSheet from 'react-native-action-sheet'

import I18n from '../../../locales'
import { Bibles } from '../../constants'
import { BibleState } from '../../store/Bible/types'
import { setBibleVersion } from '../../store/Bible/actions'
import { resetAndPlayTrack } from '../../actions'

interface Props {
  bible: BibleState
  actions: {
    setBibleVersion: typeof setBibleVersion
    resetAndPlayTrack: typeof resetAndPlayTrack
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    paddingHorizontal: 10,
  },
})

const HeaderRightBibleVerses: React.FC<Props> = ({ bible, actions }) => {
  const handleOnPressVersion = () => {
    const options = Bibles.map(el => el.name)
    options.push(I18n.t('Cancel'))

    ActionSheet.showActionSheetWithOptions({
      title: '',
      options: options,
      cancelButtonIndex: options.length - 1,
    }, async (buttonIndex) => {
      if (typeof buttonIndex !== 'undefined' && buttonIndex !== options.length - 1) {
        if (bible.version.id !== Bibles[buttonIndex].id) {
          actions.setBibleVersion(Bibles[buttonIndex])
        }
      }
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.container, styles.option]}
        onPress={handleOnPressVersion}>
        <Text style={{color: '#FFFFFF'}}>{bible.version.abbr}</Text>
        <Icon type="feather" name="chevron-down" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderRightBibleVerses
