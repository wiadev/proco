import { assign } from "../../../core/utils";
import {
  USER_LOOP_CHANGED,
  USER_LOOP_CAPTURED,
  USER_LOOP_STATUS_CHANGED,
  USER_LOOP_UPLOAD_PROGRESS_CHANGED,
  USER_LOOP_CLEAN_CAPTURED
} from "./actions";

export const initialState = {
  current: null,
  captured: null,
  status: 'WAITING',
  progress: null,
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default:
      return state;
    case USER_LOOP_CHANGED:
      return assign(state, {
        current: null,
      });
    case USER_LOOP_STATUS_CHANGED:
      return assign(state, {
        status: action.payload.status,
      });
    case USER_LOOP_CAPTURED:
      return assign(state, {
        status: 'PREVIEWING',
        file: action.payload.file,
      });
    case USER_LOOP_UPLOAD_PROGRESS_CHANGED:
      return assign(state, {
        progress: action.payload.progress,
      });
    case USER_LOOP_CLEAN_CAPTURED:
      return assign(state, {
        status: 'WAITING',
        file: null,
      });
  }

}
