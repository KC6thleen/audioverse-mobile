import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

import I18n from 'locales'

const HeaderTitle = ({ language, title }) => (
  <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 16}}>{I18n.t(title, {locale: language})}</Text>
)

HeaderTitle.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default HeaderTitle
