import React from 'react'
import PropTypes from 'prop-types'

import IconButton from 'src/components/buttons/IconButton'
import I18n from 'locales'

const HeaderLeft = ({ onPress }) => (
  <IconButton
    style={{paddingHorizontal: 15}}
    name="menu"
    size={24}
    color="#FFFFFF"
    onPress={onPress}
    accessibilityLabel={I18n.t("menu")} />
)

HeaderLeft.propTypes = {
  onPress: PropTypes.func
}

export default HeaderLeft
