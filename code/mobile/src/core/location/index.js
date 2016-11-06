import { eventChannel, takeEvery, takeLatest } from "redux-saga";
import { call, cancel, fork, take, put, select } from "redux-saga/effects";
import { SIGN_OUT_FULFILLED } from "../auth/actions";
import { getUID } from "../auth/api";
import subscriptionCreator from "./subscribe";
import { LOCATION_UPDATED, START_TRACKING_LOCATION, STARTED_TRACKING_LOCATION, STOP_TRACKING_LOCATION, startedTracking, stoppedTracking} from "./actions";
import { updateLocation as updateLocationToDatabase } from "./api";

const subscribe = (uid, emit) =>
  eventChannel(emit => subscriptionCreator(uid, emit));

function* processNewLocationData(action) {
  let {payload: {uid, latitude, longitude}} = action;

  try {
    yield call(updateLocationToDatabase, uid, latitude, longitude);
  } catch (e) {
    //
  }

}

function* startTracking() {
  try {
    yield call(Location.requestAlwaysAuthorization);
    yield call(Location.startUpdatingLocation);
    yield call(Location.setDistanceFilter, 50);
    yield put(startedTracking());
  } catch (e) {
    //
  }

}

function* stopTracking() {
  try {
    yield call(Location.stopUpdatingLocation);
    yield put(stoppedTracking());
  } catch (e) {
    //
  }
}

function* watchNewLocationData() {
  yield * takeEvery(LOCATION_UPDATED, processNewLocationData);
}

function* watchStartTracking() {
  yield * takeLatest(START_TRACKING_LOCATION, startTracking);
}

function* watchLocation() {
  while (true) {
    let uid = yield select(getUID);
    yield take(STARTED_TRACKING_LOCATION);
    let watcher = yield fork(read, subscribe, uid);
    yield take([SIGN_OUT_FULFILLED, STOP_TRACKING_LOCATION]);
    yield cancel(watcher);
    yield fork(stopTracking);
  }
}

const sagas = [
  fork(watchLocation),
  fork(watchStartTracking),
  fork(watchNewLocationData),
];

export default sagas;
