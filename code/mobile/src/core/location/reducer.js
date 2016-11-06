import { Record } from "immutable";
import {
  REQUEST_LOCATION_PERMISSION,
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
  permitted: null,
  requested: false,
});

export default function userLocatonReducer(state = new UserLocationState(), {payload, type}) {
  switch (type) {
    case REQUEST_LOCATION_PERMISSION:
      return state.set('requested', true);
    case STARTED_TRACKING_LOCATION:
      return state.set('tracking', true);
    case STOPPED_TRACKING_LOCATION:
      return state.set('tracking', false);
    case LOCATION_UPDATED:
      return state.set('latitude', payload.latitude).set('longitude', payload.longitude);
    case SIGN_OUT_FULFILLED:
      return new UserLocationState();
    default:
      return state;
  }
}
