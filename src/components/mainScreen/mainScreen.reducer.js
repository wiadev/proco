import { Map } from 'immutable';

// Actions
const LOADED = 'hello/mainscreen/LOADED';

// Reducer
const defState = Map({
  isLoaded: false,
});

export default function reducer(state = defState, action = {}) {
  switch (action.type) {
    default: return state;
    case LOADED:
      return state.set('isLoaded', true);
  }
}

// Action Creators
export function loadPage() {
  return { type: LOADED };
}
