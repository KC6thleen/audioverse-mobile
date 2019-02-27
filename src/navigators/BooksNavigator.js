import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Books from 'src/containers/books'
import Book from 'src/containers/books/book'
import HeaderRightBook from './headerrightbook'

const BooksStack = createStackNavigator({
  Books: {
    screen: Books,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
      headerTitle: <HeaderTitle title="books" />,
      headerRight: <HeaderRight navigation={navigation} />
    })
  },
  Book: {
    screen: Book,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerRight: <HeaderRightBook />
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

export default BooksStack
