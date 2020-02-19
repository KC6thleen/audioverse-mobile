import React from 'react'
import { Text } from 'react-native'

import I18n from '../../../locales'

interface Props {
  language: string
  tintColor: string
  title: string
}

const TabBarLabel: React.FC<Props> = ({ language, tintColor, title }) => (
  <Text
    numberOfLines={1}
    style={{
      fontSize: 12,
      color: tintColor,
      textAlign: 'center',
    }}>
    {I18n.t(title, {locale: language})}
  </Text>
)

export default TabBarLabel
