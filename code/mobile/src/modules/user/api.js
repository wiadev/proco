import { getUserRef, getKey, database, timestamp } from "../../core/firebase";

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

export const updateCurrentQuestion = (uid, question) => {
  const usersRef = database.ref('users');
  const key = uid + '-' + getKey();
  const questionUpdates = {
    [`info/${uid}/current_question`]: question,
    [`info/${uid}/current_question_id`]: key,
    [`questions/${key}`]: {
      uid,
      question,
      current: true,
      timestamp: timestamp,
    },
  };
  return usersRef.update(questionUpdates);
};
