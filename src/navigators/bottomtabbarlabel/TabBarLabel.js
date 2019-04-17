import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import I18n from 'locales'

const TabBarLabel = ({ language, tintColor, title }) => (
  <Text style={{fontSize: 11, color: tintColor, textAlign: 'center'}}>{I18n.t(title, {locale: language})}</Text>
)

TabBarLabel.propTypes = {
  language: PropTypes.string.isRequired,
  tintColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default TabBarLabel
