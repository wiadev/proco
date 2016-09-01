/* @flow */

import { combineReducers } from 'redux';

import inAppAlertReducer from '../modules/InAppAlert/reducer';
import authReducer from '../modules/Authentication/reducer';
import {
Info as userReducer,
Is as isUserReducer,
Tokens as tokensReducer,
} from '../modules/User/reducers';
import permissionsReducer from '../modules/Permissions/reducer';
import statusBarReducer from '../modules/StatusBar/reducer';

const reducers = {
  inAppAlerts: inAppAlertReducer,
  auth: authReducer,
  user: userReducer,
  tokens: tokensReducer,
  isUser: isUserReducer,
  permissions: permissionsReducer,
  statusbar: statusBarReducer,
};

const namespacedReducer = combineReducers(
	reducers,
);

export default function mainReducer(state, action) {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return namespacedReducer(state || void 0, action);
}
