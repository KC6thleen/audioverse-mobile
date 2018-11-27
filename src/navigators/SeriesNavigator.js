import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Series from 'src/containers/series'
import Serie from 'src/containers/series/serie'

const SeriesStack = createStackNavigator({
  Series: {
    screen: Series,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
      headerTitle: <HeaderTitle title="series" />,
      headerRight: <HeaderRight navigation={navigation} />
    })
  },
  Serie: {
    screen: Serie,
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

export default SeriesStack
