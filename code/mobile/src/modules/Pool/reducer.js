import { assign } from '../../core/utils';
import _ from 'lodash';

export const initialState = {
  items: {},
  isInProgress: false,
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case 'POOL_ADD':
      return assign(state, {
        items: assign(state.items, {
          [action.payload.key]: action.payload
        }),
      });
    case 'POOL_REMOVE':
      return assign(state, {
        items: _.omit(state.items, action.payload.key),
      });
  }

}
