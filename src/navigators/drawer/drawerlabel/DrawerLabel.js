import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import I18n from 'locales'

const DrawerLabel = ({ language, tintColor, title }) => (
  <Text style={{margin: 16, fontWeight: 'bold', color: tintColor}}>{I18n.t(title, {locale: language})}</Text>
)

DrawerLabel.propTypes = {
  language: PropTypes.string.isRequired,
  tintColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default DrawerLabel
