import { assign } from '../../core/utils';
import _ from 'lodash';

export const initialState = {
  items: {},
  watchStatus: 'LOADING',
  status: {
    status: 'NULL',
    last_checked: 0,
  },
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case 'POOL_ADD':
      return assign(state, {
        items: assign(state.items, {
          [action.payload.uid]: action.payload
        }),
      });
    case 'POOL_REMOVE':
      return assign(state, {
        items: _.omit(state.items, action.payload.uid),
      });
    case 'POOL_STATUS_CHANGED':
      return assign(state, {
        status: action.payload.status,
      });
    case 'POOL_WATCH_STATUS_CHANGED':
      return assign(state, {
        watchStatus: action.payload.status,
      });
  }

}
