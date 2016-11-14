import { call, put, take, select } from "redux-saga/effects";
import { getUID } from "../auth/api";

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function* read(subscribe) {
  let uid = yield select(getUID);
  const channel = yield call(subscribe, uid);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
