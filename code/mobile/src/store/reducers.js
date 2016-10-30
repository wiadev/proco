/* @flow */

import { combineReducers } from "redux";
import { authReducer } from "../core/auth/reducer";
import { userDataReducer} from "../modules/user/reducer";

const reducers = {
  auth: authReducer,
  user: userDataReducer,
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
