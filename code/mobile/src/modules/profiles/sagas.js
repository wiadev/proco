import { call, cancel, fork, put, take, select } from "redux-saga/effects";
import { profileActions } from "./actions";
import { getProfile } from "./api";

function* loadProfile(uid) {
  try {
    const profile = yield call(getProfile, uid);
    yield put(profileActions.profileLoaded(uid, profile));
  } catch (error) {
    //yield put(profileActions.profileLoadFailed(error));
  }
}

function* watchProfileRequests() {
  while (true) {
    let {payload: { uid }} = yield take(profileActions.PROFILE_LOAD_REQUEST);
    yield fork(loadProfile(uid));
  }
}

export const sagas = [
  fork(watchProfileRequests),
];
