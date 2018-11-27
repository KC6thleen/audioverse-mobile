import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Sponsors from 'src/containers/sponsors'
import Sponsor from 'src/containers/sponsors/sponsor'

const SponsorsStack = createStackNavigator({
  Sponsors: {
    screen: Sponsors,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
      headerTitle: <HeaderTitle title="sponsors" />,
      headerRight: <HeaderRight navigation={navigation} />
    })
  },
  Sponsor: {
    screen: Sponsor,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title
    })
  }
}, {
  defaultNavigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor
  },
  navigationOptions: ({ navigation }) => {
    let drawerLockMode = 'unlocked'
    if (navigation.state.index > 0) {
      drawerLockMode = 'locked-closed'
    }
  
    return {
      drawerLockMode
    }
  }
})

export default SponsorsStack
