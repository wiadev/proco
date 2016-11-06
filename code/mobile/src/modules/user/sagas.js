import { eventChannel, takeEvery } from "redux-saga";
import { call, cancel, fork, put, take, select } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import { SIGN_IN_FULFILLED, SIGN_OUT_FULFILLED } from "../../core/auth/actions";
import { USER_DATA_INITIALIZED, USER_SETTINGS_SAVE_REQUESTED } from "./actions";
import { onboardingData } from "./onboarding/api";
import { onboarding, USER_ONBOARDING_COMPLETED, userOnboardingStarted } from "./onboarding";
import subscriptionCreator from "./subscribe";
import {saveSettings as saveSettingsToDatabase} from './api';
const subscribe = (uid, emit) =>
  eventChannel(emit => subscriptionCreator(uid, emit));

function* read(uid) {
  const channel = yield call(subscribe, uid);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* saveSettings(action) {
  let {payload} = action;

  try {
    yield call(saveSettingsToDatabase, uid, payload);
  } catch (e) {
    // @TODO: save failed
  }

}


function* watchRequestsForSaveSettings() {
  yield * takeEvery(USER_SETTINGS_SAVE_REQUESTED, saveSettings);
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

    let settingsJob = yield fork(watchRequestsForSaveSettings);
    yield call(Actions.app);

    yield take([SIGN_OUT_FULFILLED]);
    yield cancel([dataJobs, settingsJob]);
  }
}

export const userSagas = [
  fork(watchAuthentication),
];
