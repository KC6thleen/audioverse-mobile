import { AppRegistry, Platform } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import configureStore from 'src/reducers/configureStore'
import createApp from './App'
import createEventHandler from 'src/utils/event-handler'

const { store, persistor } = configureStore()

AppRegistry.registerComponent('AudioVerse', () => createApp(store, persistor))
if (Platform.OS === 'ios') {
  TrackPlayer.registerEventHandler(createEventHandler(store)) // ios event handler
} else {
  AppRegistry.registerHeadlessTask('TrackPlayer', () => createEventHandler(store)) // android event handler
}


// remove the warning isMounted... in the mean time the react-navigation library is updated
// https://github.com/react-navigation/react-navigation/issues/3657#issuecomment-379607655
console.ignoredYellowBox = [
  // 'Warning: componentWillMount is deprecated',
  // 'Warning: componentWillReceiveProps is deprecated',
  'Warning: isMounted(...) is deprecated',
  // 'Warning: Encountered two children with the same key',
]
