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
  apiKey: "AIzaSyDtebbExST_vz3cMMy_YLdIrNNKohIGlNc",
  authDomain: "hello-4c376.firebaseapp.com",
  databaseURL: "https://hello-4c376.firebaseio.com",
  storageBucket: "hello-4c376.appspot.com",
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