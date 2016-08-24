import { assign } from '../../../core/utils';

const initialState = {
  verified: false,
  blocked: false,
  god: false,
  hasStartedLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: return state;
    case 'USER_UPDATED_IS':
      return assign(state, action.payload, {
        hasStartedLoading: true,
      });
  }
}
