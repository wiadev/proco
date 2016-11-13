import { UserData } from './user';
import { USER_DATA_INITIALIZED, USER_DATA_RECEIVED } from './actions';
import { SIGN_OUT_FULFILLED } from '../../core/auth/actions';

export default function userDataReducer(state = new UserData(), {payload, type}) {

  switch (type) {
    case USER_DATA_INITIALIZED:
      return state.set('initialized', true);

    case USER_DATA_RECEIVED:
      return state.set(payload.type,
        state[payload.type].set(payload.key, payload.value)
      );

    case SIGN_OUT_FULFILLED:
      return new UserData();

    default:
      return state;
  }
}
