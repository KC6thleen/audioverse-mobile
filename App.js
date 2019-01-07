/**
 * AudioVerse React Native App
 * https://github.com/avorg/audioverse-mobile
 * @flow
 */

import React, { PureComponent } from 'react'
import { AppState } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'react-native-firebase'

import AppNavigator from 'src/navigators/AppNavigator'
import NavigationService from 'src/utils/navigation-service'
import * as actions from 'src/actions'

class App extends PureComponent {

  getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null
    }
    const route = navigationState.routes[navigationState.index]
    // Dive into nested navigators
    if (route.routes) {
      return this.getActiveRouteName(route)
    }
    return route.routeName
  }

  // callback executed once the persited state has been rehydrated into the redux store
  onBeforeLift = () => {
    this.props.store.dispatch(actions.startup())
  }

  render() {
    return (
      <Provider store={this.props.store}>
        {/* PersistGate delays the rendering of the UI until the persisted state has been retrieved and saved to redux */}
        <PersistGate loading={null} persistor={this.props.persistor} onBeforeLift={this.onBeforeLift}>
          <AppNavigator
            ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef) }}
            onNavigationStateChange={(prevState, currentState) => {
              const currentScreen = this.getActiveRouteName(currentState)
              const prevScreen = this.getActiveRouteName(prevState)
              if (prevScreen !== currentScreen) {
                firebase.analytics().setCurrentScreen(currentScreen)
              }
            }}
          />
        </PersistGate>
      </Provider>
    )
  }
  
}

export default function(store, persistor) {
  App.defaultProps = {
    store,
    persistor
  }
  return App
}
