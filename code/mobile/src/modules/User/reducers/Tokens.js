import { assign } from '../../../core/utils';

const initialState = {
  fcm: null,
  facebook: null,
  firebase: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: return state;
    case 'USER_UPDATED_TOKENS':
      return assign(state, action.payload);
  }
}
