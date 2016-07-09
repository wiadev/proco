import { Map, List } from 'immutable';

// Actions
const LOADED = 'hello/messageslist/LOADED';

// Reducer
const defState = Map({
  isLoaded: false,
  messageList: List([
    {
      imageUri: './../../images/exampleAvatar.jpg',
      userName: 'Leyla',
      userAge: 23,
      userTitle: 'Makina Muhendisligi',
      messageCount: 0,
    },
    {
      imageUri: './../../images/exampleAvatar.jpg',
      userName: 'Deniz',
      userAge: 35,
      userTitle: 'Bilgisayar Muhendisligi',
      messageCount: 3,
    },
    {
      imageUri: './../images/exampleAvatar.jpg',
      userName: 'Leman',
      userAge: 19,
      userTitle: 'Cevre Bilimleri',
      messageCount: 2,
    },
  ]),
});

export default function reducer(state = defState, action = {}) {
  switch (action.type) {
    default: return state;
    case LOADED:
      return state.set('isLoaded', true);
  }
}

// Action Creators
export function loadPage() {
  return { type: LOADED };
}

export {
  defState as defaultState,
};
