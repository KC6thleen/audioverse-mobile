import React from 'react'
import { Text } from 'react-native'

import I18n from '../../../locales'

interface Props {
  language: string
  tintColor: string
  orientation: string
  title: string
}

const TabBarLabel: React.FC<Props> = ({ language, tintColor, orientation, title }) => (
  <Text
    numberOfLines={1}
    style={{
      marginLeft: orientation === 'horizontal' ? 15 : 0,
      fontSize: 11,
      color: tintColor,
      textAlign: 'center',
    }}>
    {I18n.t(title, {locale: language})}
  </Text>
)

export default TabBarLabel
