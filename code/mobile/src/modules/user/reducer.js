import { UserData } from './user';
import { userDataActions } from './actions';

export function userDataReducer(state = new UserData(), {payload, type}) {
  switch (type) {
    case userDataActions.USER_DATA_INITIALIZED:
      return state.set('initialized', true);

    case userDataActions.USER_DATA_RECEIVED:
      return state.set(payload.type,
        state.get(payload.type).set(payload.value)
      );

    default:
      return state;
  }
}
