import { Map } from 'immutable';

const initialState = Map({
  isLoaded: false,
  suspendDiscovery: false,
  notifyNewMessagesFromMatches: true,
  notifyNewMessages: false,
  notifyNewAnswers: true,
  notifyTrendingSpots: false,
  notifyReminders: true,
  notifyAnnouncements: false,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: return state;
    case 'USER_UPDATED_DISCOVERY_FILTERS':
      return state.set('isLoaded', action.payload.isLoaded)
        .set('suspendDiscovery', action.payload.suspendDiscovery)
        .set('notifyNewMessagesFromMatches', action.payload.notifyNewMessagesFromMatches)
        .set('notifyNewMessages', action.payload.notifyNewMessages)
        .set('notifyNewAnswers', action.payload.notifyNewAnswers)
        .set('notifyTrendingSpots', action.payload.notifyTrendingSpots)
        .set('notifyReminders', action.payload.notifyReminders)
        .set('notifyAnnouncements', action.payload.notifyAnnouncements);
  }
}
