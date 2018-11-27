import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Presenters from 'src/containers/presenters'
import Presenter from 'src/containers/presenters/presenter'

const PresentersStack = createStackNavigator({
  Presenters: {
    screen: Presenters,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
      headerTitle: <HeaderTitle title="presenters" />,
      headerRight: <HeaderRight navigation={navigation} />
    })
  },
  Presenter: {
    screen: Presenter,
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

export default PresentersStack
