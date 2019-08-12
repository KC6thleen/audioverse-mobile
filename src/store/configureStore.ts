import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'

import reducer from './index'
import mySaga from '../sagas'

export default () => {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(reducer, applyMiddleware(sagaMiddleware))

  // persistor
  const persistor = persistStore(store)

  // run the saga
  sagaMiddleware.run(mySaga)

  return { store, persistor }
}
