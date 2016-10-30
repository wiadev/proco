import { Record } from 'immutable';

export const UserData = new Record({
  settings: new UserSettings(),
  info: new UserInfo(),
  initialized: false,
});

const UserSettings = new Record({
  notify_announcements: true,
  notify_new_messages: true,
  suspend_discovery: false,
  age_min: 18,
  age_max: 30,
  only_from_network: false,
});

const UserInfo = new Record({
  avatar: null,
  birthday: null,
  fid: null,
  first_name: null,
  last_name: null,
  gender: null,
  network: null,
  network_email: null,
  network_email_verified: false,
  mobile_number_verified: false,
  current_question_id: null,
  current_question: null,
  loop_key: null,
  onboarded: false,
  god: false,
  banned: false,
});
