import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore } from './redux/store';
import getRoutes from './routes';
const firebase = require('firebase');

require('./style.css');

firebase.initializeApp({
	apiKey: "AIzaSyCFOGhparb6dYAwoKtgvnHZ37hh0EARsOQ",
	authDomain: "proco-app.firebaseapp.com",
	databaseURL: "https://proco-app.firebaseio.com",
	storageBucket: "proco-app.appspot.com",
});

const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
	<Router history={history}>
		{getRoutes(store)}
	</Router>
);

ReactDOM.render(
	<Provider store={store}>
		{component}
	</Provider>,
	document.getElementById('root')
);