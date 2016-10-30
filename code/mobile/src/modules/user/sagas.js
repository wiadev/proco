import { eventChannel } from 'redux-saga';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { authActions } from '../../core/auth';
import subscriptionCreator from './subscribe';

const subscribe = (uid) => (emit) =>
  eventChannel(emit => subscriptionCreator(uid, emit));

function* read(uid) {
  const channel = yield call(subscribe(uid));
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* watchAuthentication() {
  while (true) {
    let { payload } = yield take(authActions.SIGN_IN_FULFILLED);

    const jobs = yield fork(read, payload.authUser.uid);

    yield take([authActions.SIGN_OUT_FULFILLED]);
    yield cancel(jobs);
  }
}

export const userSagas = [
  fork(watchAuthentication),
];
