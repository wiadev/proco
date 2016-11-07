import { POOL_STATUS_CHANGED, POOL_ADDED, POOL_REMOVED, POOL_FOCUS, POOL_RESET } from "./actions";
import { assign } from "../../core/utils";
import { SIGN_OUT_FULFILLED } from "../../core/auth/actions";
import _ from "lodash";

const PoolState = {
  items: {},
  status: null,
};

export default function userPoolReducer(state = PoolState, {payload, type}) {
  switch (type) {
    case POOL_STATUS_CHANGED:
      return assign(state, {status: payload.status});
    case POOL_FOCUS:
      return state.set('permission_requested', true, 'permission_status', payload.status);
    case POOL_ADDED:
      return assign(state, {
        items: assign(state.items, {
          [payload.uid]: payload,
        }),
      });
    case POOL_REMOVED:
      return assign(state, {
        items: _.omit(state.items, payload.uid),
      });
    case POOL_RESET:
    case SIGN_OUT_FULFILLED:
      return PoolState;
    default:
      return state;
  }
}
