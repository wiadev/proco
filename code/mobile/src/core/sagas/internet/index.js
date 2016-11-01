/* eslint-disable no-constant-condition */
import { call, fork, put, take } from "redux-saga/effects";
import { auth as firebaseAuth, facebookCredential } from "../firebase";
import authActions from "./actions";
import { saveToken } from '../../modules/user/api';


const subscribe = emit => eventChannel(emit => subscriptionCreator(emit));


function* watchInternetConnection() {
  const channel = yield call(subscribe);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

export const authSagas = [
  fork(watchSignIn),
  fork(watchSignOut),
  fork(watchFacebookToken),
];
