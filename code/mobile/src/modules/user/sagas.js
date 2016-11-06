import { eventChannel, takeEvery } from "redux-saga";
import { call, cancel, fork, put, take, select } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import { SIGN_IN_FULFILLED, SIGN_OUT_FULFILLED } from "../../core/auth/actions";
import { getUID } from "../../core/auth/api";
import { USER_DATA_INITIALIZED, USER_SETTING_SAVE_REQUESTED, userDataReceived } from "./actions";
import { onboardingData } from "./onboarding/api";
import { onboarding, USER_ONBOARDING_COMPLETED, userOnboardingStarted } from "./onboarding";
import subscriptionCreator from "./subscribe";
import {saveSetting as saveSettingToDatabase} from './api';
const subscribe = (uid, emit) =>
  eventChannel(emit => subscriptionCreator(uid, emit));

function* read(uid) {
  const channel = yield call(subscribe, uid);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

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


function* watchRequestsForSaveSetting() {
  yield * takeEvery(USER_SETTING_SAVE_REQUESTED, saveSetting);
}

function* watchAuthentication() {
  while (true) {
    let {payload} = yield take(SIGN_IN_FULFILLED);

    let dataJobs = yield fork(read, payload.uid);

    yield take(USER_DATA_INITIALIZED);

    let _onboardingData = yield select(onboardingData);
    if (!_onboardingData.onboarded) {
      let onboardingFlow = yield fork(onboarding, payload.uid);
      yield put(userOnboardingStarted());
      yield take(USER_ONBOARDING_COMPLETED);
      yield cancel(onboardingFlow);
    }

    let settingsJob = yield fork(watchRequestsForSaveSetting);
    yield call(Actions.app);

    yield take([SIGN_OUT_FULFILLED]);
    yield cancel([dataJobs, settingsJob]);
  }
}

export const userSagas = [
  fork(watchAuthentication),
];
