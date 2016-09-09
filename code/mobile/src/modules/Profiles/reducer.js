import { assign } from '../../core/utils';
import _ from 'lodash';

export const initialState = {
  profiles: {},
  loops: {},
  isInProgress: false,
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case 'PROFILE_LOADED':
      return assign(state, {
        profiles: assign(state.items, {
          [action.payload.uid]: action.payload
        }),
      });
    case 'LOOPS_LOADED':
      return assign(state, {
        profiles: assign(state.items, {
          [action.payload.uid]: action.payload
        }),
      });
  }

}
