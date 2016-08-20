/* @flow */

import { combineReducers } from 'redux';
import { Map } from 'immutable';

import inAppAlertReducer from '../modules/InAppAlert/reducer';
import authReducer from '../modules/Authentication/reducer';
import {
Info as userReducer,
Settings as settingsReducer,
DiscoveryFilters as discoveryFiltersReducer,
} from '../modules/User/reducers';
import permissionsReducer from '../modules/Permissions/reducer';
import statusBarReducer from '../modules/StatusBar/reducer';
import mainScreenReducer from '../scenes/Main/redux';
import updateYourQuestionScreenReducer from '../components/UpdateYourQuestionScreen/redux';
import shootNewProfileScreenReducer from '../components/ShootNewProfileScreen/redux';
import updateYourSchoolScreenReducer from '../components/UpdateYourSchoolScreen/redux';

const reducers = {
  inAppAlerts: inAppAlertReducer,
  auth: authReducer,
  user: userReducer,
  settings: settingsReducer,
  discoveryFilters: discoveryFiltersReducer,
  permissions: permissionsReducer,
  statusbar: statusBarReducer,
  mainScreenReducer,
  updateYourQuestionScreenReducer,
  shootNewProfileScreenReducer,
  updateYourSchoolScreenReducer,
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
