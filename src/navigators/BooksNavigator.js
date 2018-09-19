import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HeaderLeft from './HeaderLeft'
import HeaderTitle from './headertitle'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Books from 'src/containers/books'
import Book from 'src/containers/books/book'

const BooksStack = createStackNavigator({
  Books: {
    screen: Books,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderLeft onPress={navigation.toggleDrawer} />,
      headerTitle: <HeaderTitle title="books" />,
    })
  },
  Book: {
    screen: Book,
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

BooksStack.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked'
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed'
  }

  return {
    drawerLockMode
  }
}

export default BooksStack
