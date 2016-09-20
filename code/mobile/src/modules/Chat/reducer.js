import { assign } from "../../core/utils";

export const initialState = {
  messages: {},
  isInProgress: false,
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
          [action.payload.thread_id]: state.threads[action.payload.thread_id].messages.concat(action.payload.messages),
        }),
      });
    case 'RECEIVED_MESSAGES':
      return assign(state, {
        messages: assign(state.messages, {
          [action.payload.thread_id]: state.threads[action.payload.thread_id].messages.append(action.payload.messages),
        }),
      });
  }

}
