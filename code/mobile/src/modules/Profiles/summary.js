import { Record } from 'immutable';

export const UserSummary = new Record({
  age: null,
  avatar: null,
  display_name: null,
  gender: null,
  network: null,
  is_online: false,
  current_question_id: null,
  current_question: null,
});
