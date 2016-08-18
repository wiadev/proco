import { Map, List } from 'immutable';
import { uniqueId } from 'lodash';

// Actions
const LOADED = 'proco/talkscreen/LOADED';
const MESSAGESLOADED = 'proco/talkscreen/MESSAGESLOADED';
const MESSAGERECEIVED = 'proco/talkscreen/MESSAGERECEIVED';
const MESSAGESENT = 'proco/talkscreen/MESSAGESENT';

// Reducer
const defState = Map({
  isLoaded: false,
  messageList: List([
    {
      uniqueId: uniqueId('msgid_'),
      text: 'Burcun ne?',
      position: 'right',
    },
    {
      uniqueId: uniqueId('msgid_'),
      text: 'Ikizler',
      position: 'left',
    },
    {
      uniqueId: uniqueId('msgid_'),
      text: 'Ne icersin?',
      position: 'left',
    },
    {
      uniqueId: uniqueId('msgid_'),
      text: 'Bira',
      position: 'right',
    },
  ]),
});

export default function reducer(state = defState, action = {}) {
  switch (action.type) {
    default: return state;
    case LOADED:
      return state.set('isLoaded', true);
    case MESSAGESLOADED:
      return state.set('messageList', action.values.messageList);
    case MESSAGERECEIVED:
      return state.set('messageList', state.get('messageList').push({
        uniqueId: uniqueId('msgid_'),
        text: action.values.text,
        position: 'left',
      }));
    case MESSAGESENT:
      return state.set('messageList', state.get('messageList').push({
        uniqueId: uniqueId('msgid_'),
        text: action.values.text,
        position: 'right',
        date: new Date(),
      }));
  }
}

// Action Creators
export function loadPage() {
  return { type: LOADED };
}

export function loadMessages(messageList) {
  return { type: MESSAGESLOADED, values: { messageList } };
}

export function receivedMessage(message) {
  return { type: MESSAGERECEIVED, values: { ...message } };
}

export function sentMessage(text) {
  return { type: MESSAGESENT, values: { text } };
}

export {
  defState as defaultState,
};
