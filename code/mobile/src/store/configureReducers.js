/* @flow */

import { combineReducers } from 'redux';
import { Map } from 'immutable';

import inAppAlertReducer from '../modules/InAppAlert/reducer';
import authReducer from '../modules/Authentication/reducer';
import {
Main as userReducer,
Settings as settingsReducer,
DiscoveryFilters as discoveryFiltersReducer,
} from '../modules/User/reducers';
import permissionsReducer from '../modules/Permissions/reducer';
import mainScreenReducer from '../components/MainScreen/redux';
import updateYourQuestionScreenReducer from '../components/UpdateYourQuestionScreen/redux';
import shootNewProfileScreenReducer from '../components/ShootNewProfileScreen/redux';
import messagesListScreenReducer from '../components/MessagesListScreen/redux';
import talkScreenReducer from '../components/TalkScreen/redux';
import updateYourSchoolScreenReducer from '../components/UpdateYourSchoolScreen/redux';

const reducers = {
  inAppAlert: inAppAlertReducer,
  auth: authReducer,
  user: userReducer,
  settings: settingsReducer,
  discoveryFilters: discoveryFiltersReducer,
  permissions: permissionsReducer,
  mainScreenReducer,
  updateYourQuestionScreenReducer,
  shootNewProfileScreenReducer,
  messagesListScreenReducer,
  talkScreenReducer,
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
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return namespacedReducer(state || void 0, action);
}
