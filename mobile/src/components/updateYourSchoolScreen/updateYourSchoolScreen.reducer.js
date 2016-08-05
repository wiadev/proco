import { Map } from 'immutable';

// Actions
const LOADED = 'hello/updateyourschool/LOADED';
const SAVED = 'hello/updateyourschool/SAVED';

// Reducer
const defState = Map({
  isLoaded: false,
  email: '',
});

export default function reducer(state = defState, action = {}) {
  switch (action.type) {
    default: return state;
    case LOADED:
      return state.set('isLoaded', true);
    case SAVED:
      return state.set('email', action.values.email);
  }
}

// Action Creators
export function loadPage() {
  return { type: LOADED };
}

export function updateYourSchool(email) {
  return { type: SAVED, values: { email } };
}

export {
  defState as defaultState,
};
