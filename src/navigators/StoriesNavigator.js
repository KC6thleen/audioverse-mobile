import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Stories from 'src/containers/stories'
import Story from 'src/containers/stories/story'

const StoriesStack = createStackNavigator({
  Stories: {
    screen: Stories,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
      headerTitle: <HeaderTitle title="stories" />,
    })
  },
  Story: {
    screen: Story,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title
    })
  }
}, {
  navigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor
  }
})

StoriesStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked'
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed'
  }

  return {
    drawerLockMode
  }
}

export default StoriesStack
