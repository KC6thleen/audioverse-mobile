/**
 * AudioVerse React Native App
 * https://github.com/avorg/audioverse-mobile
 * @flow
 */

import React, { PureComponent } from 'react'
import { AppState } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// react-navigation no redux
import AppNavigator from 'src/navigators/AppNavigator'
import NavigationService from 'src/utils/navigation-service'
// react-navigation with redux
// import AppNavigator from 'src/navigators/ReduxNavigator'

class App extends PureComponent {

  render() {
    return (
      <Provider store={this.props.store}>
        <PersistGate loading={null} persistor={this.props.persistor}>
          <AppNavigator
            ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef) }}
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
