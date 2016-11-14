import { assign } from "../../core/utils";
import { THREAD_ADDED, THREAD_CHANGED, UNSEEN_THREAD_SEEN, UNSEEN_THREAD_SPOTTED, ADD_MESSAGES_TO_THREAD } from "./actions";

export const initialState = {
  messages: {},
  threads: {},
  unseen_threads: [],
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default:
      return state;
    case THREAD_ADDED:
      return assign(state, {
        threads: assign(state.threads, {
          [action.payload.thread_id]: action.payload,
        }),
        messages: assign(state.messages, {
          [action.payload.thread_id]: [],
        }),
      });
    case THREAD_CHANGED:
      let thread_id = action.payload.thread_id;
      return assign(state, {
        threads: assign(state.threads, {
          [thread_id]: assign(state.threads[thread_id], ...action.payload),
        })
      });
    case UNSEEN_THREAD_SPOTTED:
      state.unseen_threads.push(action.payload.thread_id);
      return assign(state, {
        unseen_threads: state.unseen_threads,
      });
    case UNSEEN_THREAD_SEEN:
      return assign(state, {
        unseen_threads: state.unseen_threads.slice(
          state.unseen_threads.indexOf(action.payload.thread_id), 1
        ),
      });
    case ADD_MESSAGES_TO_THREAD:
      let messages = state.messages[action.payload.thread_id].concat(action.payload.messages);
      messages.sort((a, b) => b.createdAt - a.createdAt);
      return assign(state, {
        messages: assign(state.messages, {
          [action.payload.thread_id]: messages,
        }),
      });
  }

}
