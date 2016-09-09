import { assign } from '../../core/utils';
import _ from 'lodash';

export const initialState = {
  inbox: {},
  threads: {},
  isInProgress: false,
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case 'INBOX_LOADED':
      return assign(state, {
        inbox: assign(state.items, {
          [action.payload.uid]: action.payload
        }),
      });
    case 'THREAD_LOADED':
      return assign(state, {
        threads: assign(state.items, {
          [action.payload.uid]: action.payload
        }),
      });
  }

}
