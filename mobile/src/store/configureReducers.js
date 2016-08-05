/* @flow */

import { combineReducers } from 'redux';
import { Map } from 'immutable';

import inAppAlertReducer from '../modules/InAppAlert/reducer';
import authReducer from '../modules/Authentication/reducer';
import userReducer from '../modules/User/reducer';

const reducers = {
  inAppAlert: inAppAlertReducer,
  auth: authReducer,
  user: userReducer,
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
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return namespacedReducer(state || void 0, action);
}
