import React from 'react'
import { Button } from 'react-native-elements'
import { NavigationScreenProps } from 'react-navigation'

import I18n from '../../locales'

const HeaderRight: React.FC<NavigationScreenProps> = ({ navigation }) => (
  <Button
    icon={{
      type: 'feather',
      name: 'search',
      size: 24,
      color: '#FFFFFF',
    }}
    type="clear"
    onPress={() => navigation.navigate({routeName: 'Search'}) }
    accessibilityLabel={I18n.t("search")} />
)

export default HeaderRight
