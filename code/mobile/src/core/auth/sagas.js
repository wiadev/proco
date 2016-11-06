/* eslint-disable no-constant-condition */
import { takeLatest } from "redux-saga";
import { call, fork, put, take } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import { auth as firebaseAuth, facebookCredentia } from "../firebase";
import {
  signInFulfilled,
  signInFailed,
  signOutFulfilled,
  signOutFailed,
  SIGN_IN,
  SIGN_IN_FULFILLED,
  SIGN_OUT
} from "./actions";
import { saveToken } from "../../modules/user/api";
import { signOut as firebaseSignOut } from "./api";

function* signIn(facebookCredential) {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.signInWithCredential], facebookCredential);
    yield put(signInFulfilled(authData.uid, authData.displayName));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signOut() {
  try {
    yield call(firebaseSignOut);
    yield call(Actions.Login);
    yield put(signOutFulfilled());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

function* watchSignIn() {
  while (true) {
    let {payload} = yield take(SIGN_IN);
    yield fork(signIn, facebookCredential(payload.facebookAccessToken));
  }
}

function* watchSignOut() {
  yield * takeLatest(SIGN_OUT, signOut);
}

function* watchFacebookToken() {
  while (true) {
    let {payload: {facebookAccessToken}} = yield take(SIGN_IN);
    let {payload: {uid}} = yield take(SIGN_IN_FULFILLED);

    if (uid && facebookAccessToken) {
      yield call(saveToken, uid, 'facebook', facebookAccessToken);
    }

  }
}

export const authSagas = [
  fork(watchSignIn),
  fork(watchSignOut),
  fork(watchFacebookToken),
];
