import { assign } from '../../core/utils';

import {
  HIDE,
  SHOW,
  SET_STYLE,
  RESET,
} from './actionTypes';

export const initialState = {
  hidden: false,
  barStyle: 'default',
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case HIDE:
      return assign(state, {
        hidden: true,
      });
    case SHOW:
      return assign(state, {
        hidden: false,
      });
    case SET_STYLE:
      return assign(state, {
        barStyle: action.payload.style,
      });
    case RESET:
      return initialState;
  }

}
