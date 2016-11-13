import { Record } from 'immutable';
import { assign } from '../../core/utils';
import { PROFILE_LOADED } from './actions';

export const UserProfile = new Record({
  age: null,
  avatar: null,
  display_name: null,
  gender: null,
  network: null,
  is_online: false,
  current_question_id: null,
  current_question: null,
});

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
    case PROFILE_LOADED:
      return assign(state, {
        profiles: assign(state.profiles, {
          [action.payload.uid]: action.payload,
        }),
      });
  }

}
