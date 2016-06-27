import { Map } from 'immutable';

// Actions
const LOADED = 'hello/registerform/LOADED';
const REGISTERED = 'hello/registerform/REGISTERED';
const PAGECHANGED = 'hello/registerform/PAGECHANGED';

// Reducer
const defState = Map({
  isLoaded: false,
  email: null,
  birthDate: null,
  page: 'mainScreen',
  pageX: 1,
  pageY: 1,
});

export default function reducer(state = defState, action = {}) {
  switch (action.type) {
    default: return state;
    case LOADED:
      return state.set('isLoaded', true);
    case REGISTERED:
      return state.set('email', action.values.email)
                  .set('birthDate', action.values.birthDate);
    case PAGECHANGED:
      return state.set('page', action.values.pageName)
                  .set('pageX', action.values.pageX)
                  .set('pageY', action.values.pageY);
  }
}

// Action Creators
export function loadPage() {
  return { type: LOADED };
}

export function registerAccount(birthDate, email) {
  return { type: REGISTERED, values: { birthDate, email } };
}

export function changedPage(pageName) {
  let pageX = defState.get('pageX');
  let pageY = defState.get('pageY');
  switch (pageName) {
    case 'mainScreen':
    default:
      pageX = 1;
      pageY = 1;
      break;
    case 'settings':
      pageX = 1;
      pageY = 0;
      break;
  }
  return { type: PAGECHANGED, values: { pageX, pageY, pageName } };
}
