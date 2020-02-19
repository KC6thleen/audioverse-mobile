import React from 'react'
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack'
import { NavigationInjectedProps } from 'react-navigation'

import HeaderTitle from './headertitle'
import HeaderRight from './HeaderRight'
import { GlobalStyles, headerTintColor } from '../styles'
import Books from '../containers/books'
import Book from '../containers/books/book'
import HeaderRightBook from './headerrightbook'
import SearchNavigator from './SearchNavigator'

const Navigator = createStackNavigator({
  BooksList: {
    screen: Books,
    navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
      headerTitle: () => <HeaderTitle title="books" />,
      headerRight: () => <HeaderRight navigation={navigation} />,
    }),
  },
  Book: {
    screen: Book,
    navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
      title: navigation.state.params!.title,
      headerRight: () => <HeaderRightBook />,
    }),
  },
  SearchNavigator,
}, {
  defaultNavigationOptions: ({ navigation }: NavigationInjectedProps) => {
    const options: {[key: string]: any}  = {
      headerStyle: GlobalStyles.header,
      headerTintColor: headerTintColor,
    }
    if (navigation.state.params && navigation.state.params.showBackButton) {
      options.headerLeft = () => <HeaderBackButton tintColor={headerTintColor} onPress={() => {navigation.pop()}} />
    }
    return options
  },
})

export default Navigator
