import { AppRegistry, Platform } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import configureStore from 'src/reducers/configureStore'
import createApp from './App'
import createEventHandler from 'src/utils/event-handler'

const { store, persistor } = configureStore()

AppRegistry.registerComponent('AudioVerse', () => createApp(store, persistor))
TrackPlayer.registerPlaybackService(() => createEventHandler(store))
