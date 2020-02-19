import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { NavigationInjectedProps } from 'react-navigation'

import Search from '../containers/search'
import Presenter from '../containers/presenters/presenter'
import Conference from '../containers/conferences/conference'
import Sponsor from '../containers/sponsors/sponsor'
import Serie from '../containers/series/serie'
import { GlobalStyles, headerTintColor } from '../styles'

const Navigator = createStackNavigator({
  Search,
  Presenter,
  Conference,
  Sponsor,
  Serie,
}, {
  navigationOptions: {
    headerShown: false,
  },
  defaultNavigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor,
  },
})

export default Navigator
