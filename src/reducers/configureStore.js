import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// use next import to use react-navigation with redux
// import { middleware as reactNavigationMiddleware } from 'src/utils/react-navigation-redux'
import { persistStore } from 'redux-persist'

import reducer from './index'
import mySaga from 'src/sagas'

export default () => {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware()

  // use this to use react-navigation no redux
  const store = createStore(reducer, applyMiddleware(sagaMiddleware))
  // use this to use react-navigation with redux
  // const store = createStore(reducer, applyMiddleware(sagaMiddleware, reactNavigationMiddleware))

  // persistor
  const persistor = persistStore(store)

  // run the saga
  sagaMiddleware.run(mySaga)

  return { store, persistor }
}
