import React from 'react'
import PropTypes from 'prop-types'

import IconButton from 'src/components/buttons/IconButton'
import I18n from 'locales'

const HeaderRight = ({ navigation }) => (
  <IconButton
    name="search"
    size={24}
    color="#FFFFFF"
    style={{paddingHorizontal: 15}}
    onPress={() => navigation.navigate({routeName: 'Search'}) }
    accessibilityLabel={I18n.t("search")} />
)

HeaderRight.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default HeaderRight
