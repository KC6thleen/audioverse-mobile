import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Conferences from 'src/containers/conferences'
import Conference from 'src/containers/conferences/conference'

const ConferencesStack = createStackNavigator({
  Conferences: {
    screen: Conferences,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
      headerTitle: <HeaderTitle title="conferences" />,
      headerRight: <HeaderRight navigation={navigation} />
    })
  },
  Conference: {
    screen: Conference,
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

export default ConferencesStack
