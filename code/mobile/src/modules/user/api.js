import { getUserRef } from "../../core/firebase";

export const saveToken = (uid, type, token) =>
  getUserRef(uid, `tokens`).child(type).set(token);

export const setInfo = (uid, type, value) =>
  getUserRef(uid, `info`).child(type).set(value);

export const saveSetting = (uid, type, value) =>
  getUserRef(uid, `settings`).child(type).set(value);

export const getCurrentQuestion = state => ({
  question: state.user.info.get('current_question'),
  qid: state.user.info.get('current_question_id'),
});
