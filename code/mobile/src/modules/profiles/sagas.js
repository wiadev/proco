import { takeEvery } from "redux-saga";
import { call, fork, put } from "redux-saga/effects";
import { PROFILE_LOAD_REQUEST, PROFILE_REPORT_REQUEST, PROFILE_BLOCK_REQUEST profileLoaded } from "./actions";
import { getProfile } from "./api";

function* loadProfile(action) {
  let {payload: {uid}} = action;
  try {
    const profile = yield call(getProfile, uid);
    yield put(profileLoaded(uid, profile));
  } catch (error) {
    //yield put(profileLoadFailed(error));
  }
}

function* watchProfileRequests() {
  yield * takeEvery(PROFILE_LOAD_REQUEST, loadProfile);
}

function* watchBlockRequests() {
  yield * takeEvery([PROFILE_BLOCK_REQUEST, PROFILE_REPORT_REQUEST], blockProfile);
}

function* watchReportRequests() {
  yield * takeEvery(PROFILE_REPORT_REQUEST, loadProfile);
}

function* watchMatchRequests() {
  //yield * takeEvery(PROFILE_CHANGE_MATCH_STATUS, matchProfile);
}

const sagas = [
  fork(watchProfileRequests),
  //fork(watchBlockRequests),
  //fork(watchReportRequests),
];

export default sagas;
