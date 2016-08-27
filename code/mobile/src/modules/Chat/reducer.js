import { assign } from '../../core/utils';
import { CONVERSATION_LIST_STARTED_LOADING, CONVERSATION_LIST_UPDATED } from './actionTypes';

const initialState = {
  hasStartedLoading: false,
  list: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: return state;
    case CONVERSATION_LIST_STARTED_LOADING:
      return assign(state, {
        hasStartedLoading: true,
      });
    case CONVERSATION_LIST_UPDATED:
      return assign(state, {
        list: action.payload.data,
      });
  }
}
