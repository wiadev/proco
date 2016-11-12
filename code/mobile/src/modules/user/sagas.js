import { eventChannel, takeEvery } from "redux-saga";
import { call, cancel, fork, put, take, select } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import { read } from "../../core/sagas";
import { SIGN_IN_FULFILLED, SIGN_OUT_FULFILLED } from "../../core/auth/actions";
import { getUID } from "../../core/auth/api";
import { USER_DATA_INITIALIZED, USER_SETTING_SAVE_REQUESTED, USER_QUESTION_UPDATE_REQUEST, userDataReceived } from "./actions";
import { onboardingData } from "./onboarding/api";
import { onboarding, USER_ONBOARDING_COMPLETED, userOnboardingStarted, userOnboardingCompleted } from "./onboarding";
import subscriptionCreator from "./subscribe";
import {saveSetting as saveSettingToDatabase, updateCurrentQuestion } from './api';

const subscribe = (uid, emit) =>
  eventChannel(emit => subscriptionCreator(uid, emit));

function* saveSetting(action) {
  let {payload: { key, value }} = action;

  try {
    yield put(userDataReceived('settings', key, value));
    let uid = yield select(getUID);
    yield call(saveSettingToDatabase, uid, key, value);
  } catch (e) {
    console.log("SAVE FAILED", e);
  }

}

function* processQuestionUpdate(action) {
  let {payload: { question }} = action;

  try {
    let uid = yield select(getUID);
    yield call(updateCurrentQuestion, uid, question);
  } catch (e) {
    console.log("SAVE FAILED", e);
  }

}


function* watchQuestionUpdateRequests() {
  yield * takeEvery(USER_QUESTION_UPDATE_REQUEST, processQuestionUpdate);
}

function* watchRequestsForSaveSetting() {
  yield * takeEvery(USER_SETTING_SAVE_REQUESTED, saveSetting);
}

function* watchAuthentication() {
  while (true) {
    let {payload} = yield take(SIGN_IN_FULFILLED);

    let dataJobs = yield fork(read, subscribe, payload.uid);

    yield take(USER_DATA_INITIALIZED);

    let _onboardingData = yield select(onboardingData);
    if (!_onboardingData.onboarded) {
      let onboardingFlow = yield fork(onboarding, payload.uid);
      yield put(userOnboardingStarted());
      yield take(USER_ONBOARDING_COMPLETED);
      yield cancel(onboardingFlow);
    } else {
      yield put(userOnboardingCompleted());
    }

    let settingsJob = yield fork(watchRequestsForSaveSetting);
    yield call(Actions.app);

    yield take([SIGN_OUT_FULFILLED]);
    yield cancel(settingsJob);
    yield cancel(dataJobs);
  }
}

const userSagas = [
  fork(watchAuthentication),
];

export default userSagas;
