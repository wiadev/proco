/* @flow */

import { combineReducers } from 'redux';
import { Map } from 'immutable';

import introReducer from './../components/intro/intro.reducer';
import registerformReducer from './../components/registerForm/registerForm.reducer';
import mainScreenReducer from './../components/mainScreen/mainScreen.reducer';
import updateYourQuestionScreenReducer from './../components/updateYourQuestionScreen/updateYourQuestionScreen.reducer';
import shootNewProfileScreenReducer from './../components/shootNewProfileScreen/shootNewProfileScreen.reducer';
import discoverySettingsScreenReducer from './../components/discoverySettingsScreen/discoverySettingsScreen.reducer';
import moreSettingsScreenReducer from './../components/moreSettingsScreen/moreSettingsScreen.reducer';
import messagesListScreenReducer from './../components/messagesListScreen/messagesListScreen.reducer';
import talkScreenReducer from './../components/talkScreen/talkScreen.reducer';

const reducers = {
  introReducer,
  registerformReducer,
  mainScreenReducer,
  updateYourQuestionScreenReducer,
  shootNewProfileScreenReducer,
  discoverySettingsScreenReducer,
  moreSettingsScreenReducer,
  messagesListScreenReducer,
  talkScreenReducer,
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
