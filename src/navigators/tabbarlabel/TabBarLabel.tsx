import React from 'react'
import { Text } from 'react-native'

import I18n from '../../../locales'

interface Props {
  language: string
  tintColor: string | null
  title: string
}

const TabBarLabel: React.FC<Props> = ({ language, tintColor, title }) => (
  <Text style={
    [
      tintColor ? {color: tintColor} : {},
      {fontSize: 13, margin: 8, fontWeight: 'bold'},
    ]
  }>
    {I18n.t(title, {locale: language})}
  </Text>
)

export default TabBarLabel
