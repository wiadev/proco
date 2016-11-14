import { takeLatest } from "redux-saga";
import { call, fork } from "redux-saga/effects";
import { Vibration } from "react-native";
import { VIBRATION_REQUEST } from "./actions";

function* processVibrationRequest() {
  Vibration.vibrate([0, 500]);
}

function* watchVibrationRequests() {
  yield * takeLatest(VIBRATION_REQUEST, processVibrationRequest);
}

export default  [
  fork(watchVibrationRequests),
];
