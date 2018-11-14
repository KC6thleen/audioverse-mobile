import React from 'react'
import PropTypes from 'prop-types'

import IconButton from 'src/components/buttons/IconButton'

const HeaderRight = ({ navigation }) => (
  <IconButton onPress={() => { navigation.navigate({routeName: 'Search'}) }} style={{paddingHorizontal: 15}} name="search" size={24} color="#FFFFFF" />
)

HeaderRight.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default HeaderRight
