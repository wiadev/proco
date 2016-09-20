import { assign } from "../../core/utils";

export const initialState = {
  threads: {},
  isInProgress: false,
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default:
      return state;
    case 'SET_THREAD_INITIAL_STATE':
      return assign(state, {
        threads: assign(state.threads, {
          [action.payload.thread_id]: {
            last_message: null,
            messages: [],
          },
        }),
      });
    case 'LOADED_MESSAGES':
      return assign(state, {
        threads: assign(state.threads, {
          [action.payload.thread_id]: {
            messages: state.threads[action.payload.thread_id].messages.concat(action.payload.messages),
          },
        }),
      });
    case 'RECEIVED_MESSAGES':
      return assign(state, {
        threads: assign(state.threads, {
          [action.payload.thread_id]: {
            messages: state.threads[action.payload.thread_id].messages.append(action.payload.messages),
          },
        }),
      });
  }

}
