/**
 * AudioVerse React Native App
 * https://github.com/avorg/audioverse-mobile
 * @flow
 */

import React, { PureComponent } from 'react'
import { Linking } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import firebase from 'react-native-firebase'

import AppNavigator from 'src/navigators/AppNavigator'
import NavigationService from 'src/utils/navigation-service'
import * as actions from 'src/actions'
import { fetchData } from "src/services"
import { Endpoints, Bibles } from "src/constants"
import { parseRecording } from "src/utils"

class App extends PureComponent {

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL.bind(this))
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL.bind(this))
  }

  async _handleOpenURL(event) {

    if (event.url.match("/sermons/recordings/")) { // recording
      const id = event.url.match(/\d+/)[0]
      const url = `${Endpoints.recordings}/${id}`
      
      const { result } = await fetchData(url)
      if (result && result.length) {
        const item = parseRecording(result[0].recordings)
        this.props.store.dispatch(actions.resetAndPlayTrack([item]))
      }
      return
    }

    let routeName = ''
    let id = null
    let params = {}
    
    if (event.url.match("/music/browse")) { // music
      routeName = 'ScriptureSongs'
    } else if (event.url.match(/audiobibles\/books\/\w+\/\w+\/\w+\/\d+/)) { // Bible
      routeName = 'Chapters'
      const parts = event.url.split('/')
      const versionId = parts[parts.length - 4] + parts[parts.length - 1]
      const version = Bibles.find(el => el.id === versionId)
      const bookId = parts[parts.length - 2]
      if (version && bookId) {
        this.props.store.dispatch(actions.setBibleVersion(version, bookId))
      }
    } else if (event.url.match("/audiobooks/books/")) { // book
      routeName = 'Book'
      id = event.url.match(/\d+/)[0]
      params = {
        url: `${Endpoints.book}/${id}`,
        id,
      }
    } else if (event.url.match("/audiobooks/books")) { // books
      routeName = 'Books'
    } else if (event.url.match("/conferences/")) { // conference
      routeName = 'Conference'
      id = event.url.match(/\d+/)[0]
      params = {
        url: `${Endpoints.conference}/${id}`,
      }
    } else if (event.url.match("/conferences")) { // conferences
      routeName = 'Conferences'
    } else if (event.url.match("/presenters/")) { // presenter
      routeName = 'Presenter'
      id = event.url.match(/\d+/)[0]
      params = {
        url: `${Endpoints.presenter}/${id}`,
      }
    } else if (event.url.match("/presenters")) { // presenters
      routeName = 'Presenters'
    } else if (event.url.match("/topics/")) { // topic
      routeName = 'Topic'
      id = event.url.match(/\d+/)[0]
      params = {
        url: `${Endpoints.topic}/${id}`,
      }
    } else if (event.url.match("/topics")) { // topics
      routeName = 'Topics'
    } else if (event.url.match("/sponsors/")) { // sponsor
      routeName = 'Sponsor'
      id = event.url.match(/\d+/)[0]
      params = {
        url: `${Endpoints.sponsor}/${id}`,
      }
    } else if (event.url.match("/sponsors")) { // sponsors
      routeName = 'Sponsors'
    } else if (event.url.match("/seriess/")) { // serie
      routeName = 'Serie'
      id = event.url.match(/\d+/)[0]
      params = {
        url: `${Endpoints.serie}/${id}`,
      }
    } else if (event.url.match("/seriess")) { // series
      routeName = 'Series'
    }

    if (routeName !== '') {
      NavigationService.navigate(routeName, params)
    } else {
      Linking.openURL(event.url).catch(err => console.error(err))
    }
  }

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
