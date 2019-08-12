import React from 'react'
import {
  Text,
  Platform,
  StyleSheet,
} from 'react-native'

import I18n from '../../../locales'

interface Props {
  language: string,
  title: string,
}

const styles = StyleSheet.create({
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: Platform.OS === 'android' ? 32 : 0,
  }
})

const HeaderTitle: React.FC<Props> = ({ language, title }) => {
  return (
    <Text style={styles.title}>{title !== '' ? I18n.t(title, {locale: language}) : ''}</Text>
  )
}

export default HeaderTitle
