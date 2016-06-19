import { Map } from 'immutable';

// Actions
const LOADED = 'hello/registerform/LOADED';
const REGISTERED = 'hello/registerform/REGISTERED';

// Reducer
const defState = Map({
  isLoaded: false,
  email: null,
  birthDate: null,
});

export default function reducer(state = defState, action = {}) {
  switch (action.type) {
    default: return state;
    case LOADED:
      return state.set('isLoaded', true);
    case REGISTERED:
      return state.set('email', action.values.email)
                  .set('birthDate', action.values.birthDate);
  }
}

// Action Creators
export function loadPage() {
  return { type: LOADED };
}

export function registerAccount(birthDate, email) {
  return { type: REGISTERED, values: { birthDate, email } };
}
