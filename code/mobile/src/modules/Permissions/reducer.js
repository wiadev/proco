import { assign } from '../../core/utils';

const initialState = {
  camera: null,
  notifications: null,
  location: null,
  backgroundRefresh: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: return state;
    case 'PERMISSION_STATUS_CHANGED':
      return assign(state, action.payload);
  }
}
