import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import { GlobalStyles, headerTintColor } from 'src/styles'
import DownloadsQueue from 'src/containers/downloadsqueue'

const DownloadsQueueStack = createStackNavigator({
  DownloadsQueue: {
    screen: DownloadsQueue,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
      headerTitle: <HeaderTitle title="download_queue" />,
    })
  }
}, {
  navigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor
  }
})

DownloadsQueueStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked'
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed'
  }

  return {
    drawerLockMode
  }
}

export default DownloadsQueueStack
