import { assign } from '../../../core/utils';

const initialState = {
  verified: null,
  blocked: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: return state;
    case 'USER_UPDATED_IS':
      return assign(state, action.payload);
  }
}
