import { Map, List } from 'immutable';

// Actions
const LOADED = 'hello/updateyourquestion/LOADED';
const QUESTIONCHANGED = 'hello/updateyourquestion/QUESTIONCHANGED';

// Reducer
const defState = Map({
  isLoaded: false,
  savedQuestion: '',
});

export default function reducer(state = defState, action = {}) {
  switch (action.type) {
    default: return state;
    case LOADED:
      return state.set('isLoaded', true);
    case QUESTIONCHANGED:
      return state.set('savedQuestion', action.values.question);
  }
}

// Action Creators
export function loadPage() {
  return { type: LOADED };
}

export function questionChanged(question) {
  return { type: QUESTIONCHANGED, values: { question } };
}

export {
  defState as defaultState,
};
