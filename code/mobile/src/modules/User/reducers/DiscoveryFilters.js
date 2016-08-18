import { Map } from 'immutable';

const initialState = Map({
  isLoaded: false,
  ageMin: 18,
  ageMax: 70,
  onlyFromSchool: false,
  showFriendsInDiscovery: true,
  gender: 'Male',
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: return state;
    case 'USER_UPDATED_DISCOVERY_FILTERS':
      return state.set('isLoaded', action.payload.isLoaded)
        .set('ageMin', action.payload.ageMin)
        .set('ageMax', action.payload.ageMax)
        .set('onlyFromSchool', action.payload.onlyFromSchool)
        .set('showFriendsInDiscovery', action.payload.showFriendsInDiscovery)
        .set('gender', action.payload.gender);
  }
}
