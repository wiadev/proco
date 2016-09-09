import {database, logEvent, timestamp} from "../../core/Api";
import {assign} from "../../core/utils";
import {getThreadPeople} from './api';

export const post = (thread_id, message) => {
  return async (dispatch, getState) => {
    const {auth: {uid}} = getState();

    const to = await getThreadPeople(thread_id);

    const root = database.ref();
    const key = root.child('keyGenerator').push().key;
    message = Object.assign(message, {
      key,
    });
    root.update({
      [`threads/_/${thread_id}/${key}`]: message,
      [`threads/messages/${thread_id}/${to[0]}/${key}`]: message,
      [`threads/messages/${thread_id}/${to[1]}/${key}`]: message,
      [`users/inbox/${to[0]}/${to[1]}/last_message`]: message,
      [`users/inbox/${to[1]}/${to[0]}/last_message`]: message,
    });
  };
};

export const mute = (thread_id) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

  };
};

export const unmute = (thread_id) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

  };
};
