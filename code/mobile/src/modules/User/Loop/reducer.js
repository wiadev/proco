import { assign } from '../../../core/utils';

import {
  USER_LOOP_CAPTURED,
  USER_LOOP_STATUS_CHANGED,
  USER_LOOP_UPLOAD_PROGRESS_CHANGED,
  USER_LOOP_UPLOAD_PROGRESSES_CHANGED,
  USER_LOOP_CLEAN_CAPTURED,
} from './constants';

export const initialState = {
  captured: [],
  status: 'WAITING',
  progress: null,
  progresses: [],
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case USER_LOOP_STATUS_CHANGED:
      return assign(state, {
        status: action.payload.status,
      });
    case USER_LOOP_CAPTURED:
      return assign(state, {
        status: 'PREVIEWING',
        photos: action.payload.photos,
      });
    case USER_LOOP_UPLOAD_PROGRESS_CHANGED:
      return assign(state, {
        progress: action.payload.progress,
      });
    case USER_LOOP_UPLOAD_PROGRESSES_CHANGED:
      return assign(state, {
        progresses: action.payload.progresses,
      });
    case USER_LOOP_CLEAN_CAPTURED:
      return assign(state, {
        status: 'WAITING',
        photos: []
      });
  }

}
