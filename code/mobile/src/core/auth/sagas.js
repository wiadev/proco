/* eslint-disable no-constant-condition */
import { call, fork, put, take } from "redux-saga/effects";
import { auth as firebaseAuth, facebookCredential } from "../firebase";
import { signInFulfilled,
signInFailed,
SIGN_IN,
SIGN_IN_FULFILLED,
SIGN_OUT } from "./actions";
import { saveToken } from '../../modules/user/api';

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
    yield call([firebaseAuth, firebaseAuth.signOut]);
    yield put(signOutFulfilled());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

// WATCHERS

function* watchSignIn() {
  while (true) {
    let {payload} = yield take(SIGN_IN);
    yield fork(signIn, facebookCredential(payload.facebookAccessToken));
  }
}

function* watchSignOut() {
  while (true) {
    yield take(SIGN_OUT);
    yield fork(signOut);
  }
}

function* watchFacebookToken() {
  while (true) {
    let { payload: { facebookAccessToken } } = yield take(SIGN_IN);
    let { payload: { uid } } = yield take(SIGN_IN_FULFILLED);

    if (uid && facebookAccessToken) {
      yield call(saveToken, uid, 'facebook', facebookAccessToken);
    }

  }
}

// AUTH SAGAS

export const authSagas = [
  fork(watchSignIn),
  fork(watchSignOut),
  fork(watchFacebookToken),
];
