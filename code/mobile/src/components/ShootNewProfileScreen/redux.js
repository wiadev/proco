import { Map } from 'immutable';

// Actions
const LOADED = 'proco/shootnewprofile/LOADED';
const PHOTOSELECTED = 'proco/shootnewprofile/PHOTOSELECTED';
const PHOTOTAKEN = 'proco/shootnewprofile/PHOTOTAKEN';

// Reducer
const defState = Map({
  isLoaded: false,
  photoURI: null,
});

export default function reducer(state = defState, action = {}) {
  switch (action.type) {
    default: return state;
    case LOADED:
      return state.set('isLoaded', true);
    case PHOTOSELECTED:
      return state.set('photoURI', action.values.uri);
    case PHOTOTAKEN:
      return state.set('photoURI', action.values.uri);
  }
}

// Action Creators
export function loadPage() {
  return { type: LOADED };
}

export function photoSelected(uri) {
  return { type: PHOTOSELECTED, values: { uri } };
}

export function photoTaken(uri) {
  return { type: PHOTOTAKEN, values: { uri } };
}

export {
  defState as defaultState,
};
