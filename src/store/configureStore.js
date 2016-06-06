/* @flow */

import { applyMiddleware, createStore, compose } from 'redux';

import middleware from './../middleware/middlewareConfig';
import reducer from './configureReducers';

const enhancer = compose(
	applyMiddleware(...middleware)
);

const store = createStore(
	reducer,
	null,
	enhancer
);

export default store;
