import { assign } from '../../core/utils';

import {
  STARTED,
  LOADED,
  SET,
} from './actionTypes';

export const initialState = {
  isLoaded: false,
  isInProgress: false,
  uid: null,
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case STARTED:
      return assign(state, {
        isLoaded: false,
        isInProgress: true,
      });
    case LOADED:
      return assign(state, {
        isLoaded: true,
        isInProgress: false,
      });
    case SET:
      return assign(state, {
        isLoaded: true,
        isInProgress: false,
      }, action.payload);
  }

}
