import { assign } from '../../../core/utils';

const initialState = {
  isLoaded: false,
  ageMin: 18,
  ageMax: 40,
  onlyFromSchool: false,
  showFriendsInDiscovery: true,
  gender: 'Both',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: return state;
    case 'USER_UPDATED_FILTERS':
      return assign(state, action.payload);
  }
}
