import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux'
import history from './helpers/history'
import { Router } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas'

import App from './App';

const sagaMiddleware = createSagaMiddleware();

let composeStore = compose(
	applyMiddleware(
		sagaMiddleware,
	),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)

const store = composeStore(rootReducer)

sagaMiddleware.run(rootSaga);

render(
	<ReduxProvider store={store}>
		<Router history={history}>
			<App/>
		</Router>
	</ReduxProvider>,
	document.getElementById('root')
);