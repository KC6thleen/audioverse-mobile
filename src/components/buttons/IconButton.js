import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const IconButton = ({ onPress, style, iconStyle, ...props }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Icon {...props} style={iconStyle} />
  </TouchableOpacity>
)

IconButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.any,
  iconStyle: PropTypes.any
}

export default IconButton
