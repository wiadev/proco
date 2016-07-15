import { Map } from 'immutable';

// Actions
const LOADED = 'hello/discoverysettings/LOADED';
const SAVED = 'hello/discoverysettings/SAVED';

// Reducer
const defState = Map({
  isLoaded: false,
  ageMin: 18,
  ageMax: 70,
  onlyFromSchool: false,
  showFriendsInDiscovery: true,
  gender: 'Male',
});

export default function reducer(state = defState, action = {}) {
  switch (action.type) {
    default: return state;
    case LOADED:
      return state.set('isLoaded', true);
    case SAVED:
      return state.set('ageMin', action.values.ageMin)
                  .set('ageMax', action.values.ageMax)
                  .set('onlyFromSchool', action.values.onlyFromSchool)
                  .set('showFriendsInDiscovery', action.values.showFriendsInDiscovery)
                  .set('gender', action.values.gender);
  }
}

// Action Creators
export function loadPage() {
  return { type: LOADED };
}

export function saveDiscoverySettings(settings) {
  return { type: SAVED, values: { ...settings } };
}

export {
  defState as defaultState,
};
