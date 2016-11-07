import { Record } from "immutable";
import {
  LOCATION_PERMISSION_REQUEST,
  LOCATION_PERMISSION_REQUEST_FAILED,
  STARTED_TRACKING_LOCATION,
  STOPPED_TRACKING_LOCATION,
  LOCATION_UPDATED,
} from "./actions";
import { SIGN_OUT_FULFILLED } from "../auth/actions";

const UserLocationState = new Record({
  latitude: null,
  longitude: null,
  timestamp: null,
  tracking: false,
  permission_status: null,
  permission_requested: false,
});

export default function userLocatonReducer(state = new UserLocationState(), {payload, type}) {
  switch (type) {
    case LOCATION_PERMISSION_REQUEST:
      return state.set('permission_requested', true, 'permission_status', null);
    case LOCATION_PERMISSION_REQUEST_FAILED:
      return state.set('permission_requested', true, 'permission_status', payload.status);
    case STARTED_TRACKING_LOCATION:
      return state.set('permission_status', 'authorized').set('tracking', true);
    case STOPPED_TRACKING_LOCATION:
      return state.set('tracking', false);
    case LOCATION_UPDATED:
      return state.set('latitude', payload.latitude).set('longitude', payload.longitude).set('timestamp', Date.now());
    case SIGN_OUT_FULFILLED:
      return new UserLocationState();
    default:
      return state;
  }
}
