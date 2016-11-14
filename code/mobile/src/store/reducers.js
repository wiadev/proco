/* @flow */

import { combineReducers } from "redux";
import authReducer from "../core/auth/reducer";
import userDataReducer from "../modules/user/reducer";
import userOnboardingReducer from "../modules/user/onboarding/reducer";
import userLoopReducer from "../modules/user/loop/reducer";
import locationReducer from "../core/location/reducer";
import fcmReducer from "../core/fcm/reducer";
import profilesReducer from "../modules/profiles/reducer";
import poolReducer from "../modules/pool/reducer";
import chatReducer from "../modules/chat/reducer";
import inAppAlertsReducer from "../modules/inappalerts/reducer";

const reducers = {
  auth: authReducer,
  user: userDataReducer,
  userOnboarding: userOnboardingReducer,
  userLoop: userLoopReducer,
  location: locationReducer,
  fcm: fcmReducer,
  profiles: profilesReducer,
  pool: poolReducer,
  chat: chatReducer,
  inAppAlerts: inAppAlertsReducer,
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
