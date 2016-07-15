import { Map, List } from 'immutable';

// Actions
const LOADED = 'hello/mainscreen/LOADED';
const ADDEDMESSAGE = 'hello/mainscreen/ADDEDMESSAGE';
const GETMESSAGECOUNT = 'hello/mainscreen/GETMESSAGECOUNT';

// Reducer
const defState = Map({
  isLoaded: false,
  messageList: List([]),
  messageCount: 0,
});

export default function reducer(state = defState, action = {}) {
  switch (action.type) {
    default: return state;
    case LOADED:
      return state.set('isLoaded', true);
    case ADDEDMESSAGE:
      const updatedList = state.get('messageList').push({
        text: action.values.text,
      });
      return state.set('messageList', updatedList);
    case GETMESSAGECOUNT:
      return state.set('messageCount', action.values.messageCount);
  }
}

// Action Creators
export function loadPage() {
  return { type: LOADED };
}

export function getMessageCount(count = 0) {
  return { type: GETMESSAGECOUNT, values: { messageCount: count } };
}

export function addMessage(text = '') {
  return { type: ADDEDMESSAGE, values: { text } };
}

export {
  defState as defaultState,
};
