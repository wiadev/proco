import { takeEvery } from "redux-saga";
import { call, put, select, fork } from "redux-saga/effects";
import {
  USER_ONBOARDING_STARTED,
  USER_ONBOARDING_NETWORK_EMAIL_POSTED,
  USER_ONBOARDING_NETWORK_EMAIL_RESULTED,
  USER_ONBOARDING_MISSING_INFORMATION_POSTED,
  USER_ONBOARDING_MISSING_INFORMATION_RESULTED,
  userOnboardingNetworkEmailResulted,
  userOnboardingMissingInformationResulted,
  userOnboardingDecideStep,
  userOnboardingCompleted,
} from "./actions";
import {
  onboardingData,
  checkNetworkEmail,
  saveNetworkEmail,
  checkBirthday,
  checkGender,
  saveBirthday,
  saveGender
} from "./api";
import { getUID } from "../../../core/auth/api";
import { USER_DATA_RECEIVED } from '../actions';

export function* decideStep() {
  let data = yield select(onboardingData);

  if (data.onboarded) {
    yield put(userOnboardingCompleted());
  } else {
    yield put(userOnboardingDecideStep(data));
  }
  
}

function* processNetworkEmail(action) {
  let {payload: {network_email}} = action;

  try {
    yield call(checkNetworkEmail, network_email);
    let uid = yield select(getUID);
    yield call(saveNetworkEmail, uid, network_email);
    yield put(userOnboardingNetworkEmailResulted(false));
  } catch (e) {
    yield put(userOnboardingNetworkEmailResulted(e));
  }

}

function* processMissingInformation(action) {
  let {payload: {birthday = null, gender = null}} = action;

  try {
    let uid = yield select(getUID);

    let _onboardingData = yield select(onboardingData);

    if (_onboardingData.birthday_missing) {
      yield call(checkBirthday, birthday);
      yield call(saveBirthday, uid, birthday);
    }

    if (_onboardingData.gender_missing) {
      yield call(checkGender, gender);
      yield call(saveGender, uid, gender);
    }

    yield put(userOnboardingMissingInformationResulted(false));

  } catch (e) {
    yield put(userOnboardingMissingInformationResulted(e));
  }

}

function* watchNetworkEmail() {
  yield * takeEvery(USER_ONBOARDING_NETWORK_EMAIL_POSTED, processNetworkEmail);
}

function* watchMissingInformation() {
  yield * takeEvery(USER_ONBOARDING_MISSING_INFORMATION_POSTED, processMissingInformation);
}

export function* onboarding() {

  yield fork(watchNetworkEmail);
  yield fork(watchMissingInformation);

  yield * takeEvery([
    USER_ONBOARDING_STARTED,
    USER_ONBOARDING_NETWORK_EMAIL_RESULTED,
    USER_ONBOARDING_MISSING_INFORMATION_RESULTED,
    USER_DATA_RECEIVED,
  ], decideStep);

}
