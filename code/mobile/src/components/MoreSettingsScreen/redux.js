import { Map } from 'immutable';

// Actions
const LOADED = 'hello/moresettings/LOADED';
const SAVED = 'hello/moresettings/SAVED';

// Reducer
const defState = Map({
  isLoaded: false,
  birthday: '21/06/1995',
  school: 'Bogazici University',
  suspendDiscovery: false,
  newMessagesFromMatches: true,
  newMessages: false,
  newAnswers: true,
  trendingSpots: false,
  reminders: true,
  announcements: false,
});

export default function reducer(state = defState, action = {}) {
  switch (action.type) {
    default: return state;
    case LOADED:
      return state.set('isLoaded', true);
    case SAVED:
      return state.set('birthday', action.values.birthday)
                  .set('school', action.values.school);
  }
}

// Action Creators
export function loadPage() {
  return { type: LOADED };
}

export function saveMoreSettings(settings) {
  return { type: SAVED, values: { ...settings } };
}

export {
  defState as defaultState,
};
