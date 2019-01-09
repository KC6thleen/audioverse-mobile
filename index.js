import React from 'react'
import {
  AppRegistry,
  Text,
  Platform,
} from 'react-native'
import TrackPlayer from 'react-native-track-player'

import configureStore from 'src/reducers/configureStore'
import createApp from './App'
import createEventHandler from 'src/utils/event-handler'

const { store, persistor } = configureStore()

AppRegistry.registerComponent('AudioVerse', () => createApp(store, persistor))
TrackPlayer.registerPlaybackService(() => createEventHandler(store))

// On android, OnePlus and Oppo devices use a custom font that may cause truncated text on some parts,
// as a workaround set the default Text font to Roboto or Arial
// https://github.com/facebook/react-native/issues/15114
if (Platform.OS === 'android') {
  const oldRender = Text.render
  Text.render = function (...args) {
      const origin = oldRender.call(this, ...args)
      return React.cloneElement(origin, {
        style: [{fontFamily: 'Roboto'}, origin.props.style],
      })
  }
}
