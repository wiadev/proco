/* @flow */

import { combineReducers } from 'redux';
import { Map } from 'immutable';

import inAppAlertReducer from '../modules/InAppAlert/reducer';
import authReducer from '../modules/Authentication/reducer';
import userReducer from '../modules/User/reducer';

import mainScreenReducer from '../components/MainScreen/redux';
import updateYourQuestionScreenReducer from '../components/UpdateYourQuestionScreen/redux';
import shootNewProfileScreenReducer from '../components/ShootNewProfileScreen/redux';
import discoverySettingsScreenReducer from '../components/DiscoverySettingsScreen/redux';
import moreSettingsScreenReducer from '../components/MoreSettingsScreen/redux';
import messagesListScreenReducer from '../components/MessagesListScreen/redux';
import talkScreenReducer from '../components/TalkScreen/redux';
import updateYourSchoolScreenReducer from '../components/UpdateYourSchoolScreen/redux';

const reducers = {
  inAppAlerts: inAppAlertReducer,
  auth: authReducer,
  user: userReducer,
  mainScreenReducer,
  updateYourQuestionScreenReducer,
  shootNewProfileScreenReducer,
  discoverySettingsScreenReducer,
  moreSettingsScreenReducer,
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
