import { takeEvery } from "redux-saga";
import { call, fork, put, select } from "redux-saga/effects";
import { getUID } from "../../core/auth/api";
import { assign } from "../../core/utils";
import { send } from "../chat/actions";
import {
  PROFILE_LOAD_REQUEST,
  PROFILE_REPORT_REQUEST,
  PROFILE_BLOCK_REQUEST,
  PROFILE_MATCH_REQUEST,
  profileLoaded,
  profileLoadFailed,
  block
} from "./actions";
import { getProfile, changeBlockStatus, report, changeMatchStatus, afterMatchTasks, shouldGetProfile } from "./api";

function* processProfileLoadRequest({payload: {uid}}) {
  try {
    let shouldGet = yield select(shouldGetProfile, uid);
    if (shouldGet) {
      let profile = yield call(getProfile, uid);
      yield put(profileLoaded(uid, profile));
    }
  } catch (error) {
    yield put(profileLoadFailed(error));
  }
}


function * processBlockRequest({payload: {pid, status, payload}}) {
  try {
    let uid = yield select(getUID);
    yield call(changeBlockStatus, uid, pid, status, payload);
  } catch (e) {
    console.log(e);
  }
}

function * processReportRequest({payload: {pid, payload}}) {

  try {
    yield put(block(pid, assign(payload, {
      triggered_by: 'report',
    })));
    let uid = yield select(getUID);
    yield call(report, uid, pid, payload);
  } catch (e) {
    console.log(e);
  }

}

function * processMatchRequest({payload: {pid}}) {

  try {
    let uid = yield select(getUID);
    yield call(changeMatchStatus, uid, pid, true);
    let thread_key = yield call(afterMatchTasks, uid, pid);
    yield put(send(thread_key, {
      text: `Congrats, it's a match!`,
      user: 'proco',
      type: 'matched-banner',
    }));
  } catch (e) {
    console.log(e);
  }

}

function* watchProfileLoadRequests() {
  yield * takeEvery(PROFILE_LOAD_REQUEST, processProfileLoadRequest);
}

function* watchBlockRequests() {
  yield * takeEvery(PROFILE_BLOCK_REQUEST, processBlockRequest);
}

function* watchReportRequests() {
  yield * takeEvery(PROFILE_REPORT_REQUEST, processReportRequest);
}

function* watchMatchRequests() {
  yield * takeEvery(PROFILE_MATCH_REQUEST, processMatchRequest);
}

export default [
  fork(watchProfileLoadRequests),
  fork(watchBlockRequests),
  fork(watchReportRequests),
  fork(watchMatchRequests),
];