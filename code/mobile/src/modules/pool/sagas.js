import { eventChannel, takeEvery } from "redux-saga";
import { call, put, select, fork, take, cancel } from "redux-saga/effects";
import { isIn } from "validator";
import { SIGN_OUT_FULFILLED } from "../../core/auth/actions";
import { getUID } from "../../core/auth/api";
import { startTracking as startTrackingLocation } from "../../core/location/actions";
import { USER_DATA_RECEIVED } from "../../modules/user/actions";
import { getCurrentQuestion } from "../../modules/user/api";
import { USER_ONBOARDING_COMPLETED } from "../../modules/user/onboarding/actions";
import { read } from "../../core/sagas";
import { POOL_SPOTTED, reset, added } from "./actions";
import { focus as focusSubscriptionCreator, pool as poolSubscriptionCreator } from "./subscribers";
import { getPoolData, isAlreadyInPool } from "./api";

const poolSubscription = (uid, emit) =>
  eventChannel(emit => poolSubscriptionCreator(uid, emit));

const focusSubscription = (uid, emit) =>
  eventChannel(emit => focusSubscriptionCreator(uid, emit));

export function* decideReset(action) {
  let {payload: {type, key}} = action;
  if (type === 'settings' && isIn(key, [
      'age_min', 'age_max', 'only_from_network', 'gender',
    ])) {
    yield put(reset());
  }
}

function * processSpottedPoolItem(action) {
  let {payload: {uid, added_on, is_close}} = action;
  try {

    let isAlreadyIn = yield select(isAlreadyInPool(uid));
    if (!isAlreadyIn) {
      let {question, qid} = yield select(getCurrentQuestion);

      let poolData = yield call(getPoolData, uid, {
        question,
        qid,
      });

      yield put(added(uid, Object.assign({
        added_on,
        is_close,
      }, poolData)));

    }

  } catch (e) {
    console.log(e);
  }
}

function * focusToPoolItem(action) {

}

function * watchFocus() {
  //yield * takeLatest(POOL_SPOTTED, focusToPoolItem);
}

function * watchAction() {
  //yield * takeEvery(POOL_SPOTTED, processSpottedPoolItem);
}

function * watchPool() {
  yield * takeEvery(POOL_SPOTTED, processSpottedPoolItem);
}

function * watchUserData() {
  yield * takeEvery(USER_DATA_RECEIVED, decideReset);
}

function * startPool() {
  let uid = yield select(getUID);
  yield put(startTrackingLocation());
  yield fork(read, poolSubscription, uid);
}

function * watchAuthentication() {
  while (true) {
    yield take(USER_ONBOARDING_COMPLETED);
    let userDataWatcher = yield fork(watchUserData);
    let poolWatcher = yield fork(startPool);
    yield take(SIGN_OUT_FULFILLED);
    yield cancel(userDataWatcher);
    yield cancel(poolWatcher);
  }
}

const sagas = [
  fork(watchAuthentication),
  fork(watchPool),
  fork(watchFocus),
  fork(watchAction),
];

export default sagas;
