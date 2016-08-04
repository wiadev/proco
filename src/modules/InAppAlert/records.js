import { Record } from 'immutable';

export const InAppAlert = new Record({
  type: null,
  title: null,
  text: null,
  closeInterval: 4000
});
