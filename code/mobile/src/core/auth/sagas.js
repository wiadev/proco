/* eslint-disable no-constant-condition */
import { call, fork, put, take } from "redux-saga/effects";
import { auth as firebaseAuth, facebookCredential } from "../firebase";
import { authActions } from "./actions";

function* signIn(facebookCredential) {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.signInWithCredential], facebookCredential);
    yield put(authActions.signInFulfilled(authData.user));
  } catch (error) {
    yield put(authActions.signInFailed(error));
  }
}

function* signOut() {
  try {
    yield call([firebaseAuth, firebaseAuth.signOut]);
    yield put(authActions.signOutFulfilled());
  } catch (error) {
    yield put(authActions.signOutFailed(error));
  }
}

// WATCHERS

function* watchSignIn() {
  while (true) {
    let {payload} = yield take(authActions.SIGN_IN);
    yield fork(signIn, facebookCredential(payload.facebookAccessToken));
  }
}

function* watchSignOut() {
  while (true) {
    yield take(authActions.SIGN_OUT);
    yield fork(signOut);
  }
}

// AUTH SAGAS

export const authSagas = [
  fork(watchSignIn),
  fork(watchSignOut)
];
