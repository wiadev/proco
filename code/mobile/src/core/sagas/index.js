import { call, put, take } from "redux-saga/effects";

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function* read(subscribe, uid) {
  const channel = yield call(subscribe, uid);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
