import { eventChannel } from "redux-saga";
import { call, cancel, fork, put, take, select } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import { SIGN_IN_FULFILLED, SIGN_OUT_FULFILLED } from "../../core/auth/actions";
import { USER_DATA_INITIALIZED, USER_ONBOARDED } from "./actions";
import { onboardingData } from "./onboarding/api";
import { onboarding, USER_ONBOARDING_COMPLETED, userOnboardingStarted } from "./onboarding";
import subscriptionCreator from "./subscribe";

const subscribe = (uid, emit) =>
  eventChannel(emit => subscriptionCreator(uid, emit));

function* read(uid) {
  const channel = yield call(subscribe, uid);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* watchAuthentication() {
  while (true) {
    let {payload} = yield take(SIGN_IN_FULFILLED);

    let jobs = yield fork(read, payload.uid);

    yield take(USER_DATA_INITIALIZED);

    let _onboardingData = yield select(onboardingData);
    if (!_onboardingData.onboarded) {
      let onboardingFlow = yield fork(onboarding, payload.uid);
      yield put(userOnboardingStarted());
      yield take(USER_ONBOARDING_COMPLETED);
      yield cancel(onboardingFlow);
    }

    yield call(Actions.Main);

    yield take([SIGN_OUT_FULFILLED]);
    yield cancel(jobs);
  }
}

export const userSagas = [
  fork(watchAuthentication),
];
