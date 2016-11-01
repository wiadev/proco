import { eventChannel } from "redux-saga";
import { call, cancel, fork, put, take, select } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import { SIGN_IN_FULFILLED,
SIGN_OUT_FULFILLED} from "../../core/auth/actions";
import { userDataActions } from "./actions";
import { isOnboarded } from "./api";
import subscriptionCreator from "./subscribe";

const subscribe = (uid, emit) =>
  eventChannel(emit => subscriptionCreator(uid, emit));

function* read(uid) {
  const channel = yield call(subscribe, uid);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* watchAuthentication() {
  while (true) {
    let {payload} = yield take(SIGN_IN_FULFILLED);

    let jobs = yield fork(read, payload.uid);

    yield take(userDataActions.USER_DATA_INITIALIZED);

    let _isOnboarded = yield select(isOnboarded);
    if (!_isOnboarded) {
      yield take(userDataActions.USER_ONBOARDED);
    }

    yield call([Actions, Actions.Main]);

    yield take([SIGN_OUT_FULFILLED]);
    yield cancel(jobs);
  }
}

export const userSagas = [
  fork(watchAuthentication),
];
