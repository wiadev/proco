import { eventChannel, takeEvery, takeLatest } from "redux-saga";
import { call, put, select, fork, take, cancel } from "redux-saga/effects";
import { isIn } from "validator";
import { delay } from "../../core/sagas";
import { SIGN_OUT_FULFILLED } from "../../core/auth/actions";
import { getUID } from "../../core/auth/api";
import { startTracking as startTrackingLocation } from "../../core/location/actions";
import { USER_DATA_RECEIVED } from "../../modules/user/actions";
import { getCurrentQuestion } from "../../modules/user/api";
import { USER_ONBOARDING_COMPLETED } from "../../modules/user/onboarding/actions";
import { read } from "../../core/sagas";
import {
  POOL_SPOTTED,
  POOL_ADDED,
  POOL_REMOVED,
  POOL_ACTION,
  POOL_RESET,
  POOL_ANSWER,
  reset,
  added,
  updated,
} from "./actions";
import { focus as focusSubscriptionCreator, pool as poolSubscriptionCreator } from "./subscribers";
import { getPoolData, isAlreadyInPool, setAnswer, decideAction, resetPool } from "./api";

const poolSubscription = (uid, emit) =>
  eventChannel(emit => poolSubscriptionCreator(uid, emit));

const focusSubscription = (uid, emit) =>
  eventChannel(emit => focusSubscriptionCreator(uid, emit));

export function* decideReset(action) {
  let {payload: {type, key}} = action;
  if (type === 'settings' && isIn(key, [
      'age_min', 'age_max', 'only_from_network', 'gender',
    ])) {
    yield call(delay, 100);
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

function * triggerPoolUpdate() {
  yield put(updated());
}

function * processAfterReset () {
  let uid = yield select(getUID);
  yield call(resetPool, uid);
}

function * processPoolAction({payload: {uid, act, payload}}) {

  try {
    yield put(decideAction(uid, act, payload));

  } catch (e) {
    console.log(e);
  }
}

function * processPoolAnswer(action) {
  let {payload: {qid, answer,}} = action;

  try {
    let uid = yield select(getUID);
    let action = yield call(setAnswer, uid, qid, answer);
  } catch (e) {

  }
}

function * watchFocus() {
  //yield * takeLatest(POOL_SPOTTED, focusToPoolItem);
}

function * watchAnswers() {
  yield * takeEvery(POOL_ANSWER, processPoolAnswer);
}

function * watchActions() {
  yield * takeEvery(POOL_ACTION, processPoolAction);
}

function * watchAdditions() {
  yield * takeEvery([POOL_ADDED, POOL_REMOVED], triggerPoolUpdate);
}

function * watchPool() {
  yield * takeEvery(POOL_SPOTTED, processSpottedPoolItem);
}

function * watchUserData() {
  yield * takeLatest(USER_DATA_RECEIVED, decideReset);
}

function * watchPoolReset() {
  yield * takeEvery(POOL_RESET, processAfterReset);
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
  fork(watchPoolReset),
  fork(watchAdditions),
  fork(watchFocus),
  fork(watchActions),
  fork(watchAnswers),
];

export default sagas;
