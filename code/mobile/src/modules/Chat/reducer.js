import { assign } from "../../core/utils";

export const initialState = {
  messages: {},
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default:
      return state;
    case 'SET_THREAD_INITIAL_STATE':
      return assign(state, {
        messages: assign(state.messages, {
          [action.payload.thread_id]: [],
        }),
      });
    case 'LOADED_MESSAGES':
      return assign(state, {
        messages: assign(state.messages, {
          [action.payload.thread_id]: state.messages[action.payload.thread_id].concat(action.payload.messages),
        }),
      });
    case 'RECEIVED_MESSAGES':
      return assign(state, {
        messages: assign(state.messages, {
          [action.payload.thread_id]: action.payload.messages.concat(state.messages[action.payload.thread_id]),
        }),
      });
  }

}
