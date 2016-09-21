import { assign } from '../../core/utils';
import _ from 'lodash';

export const initialState = {
  profiles: {
    proco: {
      _id: 'proco',
      name: 'Proco',
      avatar: '',
    }
  },
  isInProgress: false,
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case 'PROFILE_LOADED':
      return assign(state, {
        profiles: assign(state.profiles, {
          [action.payload.uid]: action.payload,
        }),
      });
  }

}
