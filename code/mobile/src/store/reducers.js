/* @flow */

import { combineReducers } from "redux";
import authReducer from "../core/auth/reducer";
import { userDataReducer} from "../modules/user/reducer";
import userOnboardingReducer from "../modules/user/onboarding/reducer";
import poolReducer from "../modules/pool/reducer";
import locationReducer from "../core/location/reducer";
import chatReducer from "../core/Chat/reducer";

const reducers = {
  auth: authReducer,
  user: userDataReducer,
  userOnboarding: userOnboardingReducer,
  location: locationReducer,
  pool: poolReducer,
  chat: chatReducer,
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
