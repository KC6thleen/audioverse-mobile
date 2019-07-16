import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'

import I18n from 'locales'

const HeaderRight = ({ navigation }) => (
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

HeaderRight.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default HeaderRight
