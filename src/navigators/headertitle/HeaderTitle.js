import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  Platform,
  StyleSheet,
} from 'react-native'

import I18n from 'locales'

const HeaderTitle = ({ language, title }) => (
  <Text style={styles.title}>{title !== '' ? I18n.t(title, {locale: language}) : ''}</Text>
)

const styles = StyleSheet.create({
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: Platform.OS === 'android' ? 32 : 0,
  }
})

HeaderTitle.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default HeaderTitle
