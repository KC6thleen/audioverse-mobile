import React from 'react'
import PropTypes from 'prop-types'

import IconButton from 'src/components/buttons/IconButton'

const HeaderLeft = ({ onPress }) => (
  <IconButton onPress={onPress} style={{paddingHorizontal: 15}} name="menu" size={24} color="#FFFFFF" />
)

HeaderLeft.propTypes = {
  onPress: PropTypes.func
}

export default HeaderLeft
