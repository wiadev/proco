/* @flow */

import { combineReducers } from 'redux';
import { Map } from 'immutable';

import authReducer from '../modules/Authentication/reducer';
import inAppAlertReducer from '../modules/InAppAlert/reducer';

const reducers = {
  auth: authReducer,
  inAppAlert: inAppAlertReducer,
};

const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
	reducers,
	immutableStateContainer,
	getImmutable,
	setImmutable
);

export default function mainReducer(state, action) {
  return namespacedReducer(state || void 0, action);
}
