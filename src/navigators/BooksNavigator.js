import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'

import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from 'src/styles'
import Books from 'src/containers/books'
import Book from 'src/containers/books/book'
import HeaderRightBook from './headerrightbook'
import Search from 'src/containers/search'

const Navigator = createStackNavigator({
  BooksList: {
    screen: Books,
    navigationOptions: ({ navigation }) => ({
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
  },
  Search,
}, {
  defaultNavigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor
  },
})

export default Navigator
