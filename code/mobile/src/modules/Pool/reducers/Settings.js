import { assign } from '../../../core/utils';

const initialState = {
  isLoaded: false,
  suspendDiscovery: false,
  notifyNewMessagesFromMatches: true,
  notifyNewMessages: false,
  notifyNewAnswers: true,
  notifyTrendingSpots: false,
  notifyReminders: true,
  notifyAnnouncements: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: return state;
    case 'USER_UPDATED_SETTINGS':
      return assign(state, action.payload);
  }
}
