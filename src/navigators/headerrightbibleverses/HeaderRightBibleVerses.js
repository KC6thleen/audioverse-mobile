import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const HeaderRightBibleVerses = ({ onPress, bible }) => (
  <TouchableOpacity onPress={onPress} style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15}}>
    <Text style={{color: '#FFFFFF'}}>{bible.book}</Text>
    <Icon name="chevron-down" size={24} color="#FFFFFF" />
  </TouchableOpacity>
)

HeaderRightBibleVerses.propTypes = {
  onPress: PropTypes.func,
  bible: PropTypes.object
}

export default HeaderRightBibleVerses
