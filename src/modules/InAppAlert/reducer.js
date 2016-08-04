import { Record } from 'immutable';

import {
  SHOW_IN_APP_ALERT,
  CLEAR_IN_APP_ALERT,
} from './actionTypes';

export const initialState = new Record({
  show: false,
  type: null,
  title: null,
  text: null,
  closeInterval: 4000
});

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    default: return state;
    case SHOW_IN_APP_ALERT:
      return state.set('show', true)
                  .set('type', action.payload.type)
                  .set('title', action.payload.title)
                  .set('text', action.payload.text)
                  .set('closeInterval', action.payload.closeInterval);
    case CLEAR_IN_APP_ALERT:
      return initialState;
  }

}
