import { Map } from 'immutable';

// Actions
const LOADED = 'hello/intro/LOADED';

// Reducer
const defState = Map({
  isLoaded: false,
});

export default function reducer(state = defState, action = {}) {
  switch (action.type) {
    default: return state;
    case LOADED:
      return Object.assign({}, state, {
        isLoaded: true,
      });
  }
}

// Action Creators
export function loadIntro() {
  return { type: LOADED };
}
