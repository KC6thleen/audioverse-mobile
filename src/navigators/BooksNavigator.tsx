import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { NavigationScreenProps } from 'react-navigation'

import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from '../styles'
import Books from '../containers/books'
import Book from '../containers/books/book'
import HeaderRightBook from './headerrightbook'
import Search from '../containers/search'

const Navigator = createStackNavigator({
  BooksList: {
    screen: Books,
    navigationOptions: ({ navigation }: NavigationScreenProps) => ({
      headerTitle: <HeaderTitle title="books" />,
      headerRight: <HeaderRight navigation={navigation} />,
    }),
  },
  Book: {
    screen: Book,
    navigationOptions: ({ navigation }: NavigationScreenProps) => ({
      title: navigation.state.params!.title,
      headerRight: <HeaderRightBook />,
    }),
  },
  Search,
}, {
  defaultNavigationOptions: {
    headerStyle: GlobalStyles.header,
    headerTintColor: headerTintColor,
  },
})

export default Navigator
