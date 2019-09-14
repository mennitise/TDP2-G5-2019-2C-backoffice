import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import rootSaga from './sagas'

export const sagaMiddleware = createSagaMiddleware()

let composeStore = compose(
    applyMiddleware(
        sagaMiddleware,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore)

let store = composeStore(reducers)

sagaMiddleware.run(rootSaga)

export default store
