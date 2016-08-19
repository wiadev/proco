import { assign } from '../../../core/utils';

const initialState = {
  isLoaded: false,
  ageMin: 18,
  ageMax: 70,
  onlyFromSchool: false,
  showFriendsInDiscovery: true,
  gender: 'Male',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: return state;
    case 'USER_UPDATED_DISCOVERY_FILTERS':
      return assign(state, action.payload);
  }
}
