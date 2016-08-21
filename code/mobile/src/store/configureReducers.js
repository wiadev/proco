/* @flow */

import { combineReducers } from 'redux';
import { Map } from 'immutable';

import inAppAlertReducer from '../modules/InAppAlert/reducer';
import authReducer from '../modules/Authentication/reducer';
import {
Info as userReducer,
Settings as settingsReducer,
Filters as filtersReducer,
Is as isReducer,
} from '../modules/User/reducers';
import permissionsReducer from '../modules/Permissions/reducer';
import statusBarReducer from '../modules/StatusBar/reducer';
import mainScreenReducer from '../scenes/Main/redux';

const reducers = {
  inAppAlerts: inAppAlertReducer,
  auth: authReducer,
  user: userReducer,
  settings: settingsReducer,
  filters: filtersReducer,
  is: isReducer,
  permissions: permissionsReducer,
  statusbar: statusBarReducer,
  mainScreenReducer,
};

const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
	reducers,
	immutableStateContainer,
	getImmutable,
	setImmutable,
);

export default function mainReducer(state, action) {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return namespacedReducer(state || void 0, action);
}
