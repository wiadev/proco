import { database, timestamp, getFirebaseDataWithCache } from "../../core/firebase";
import { getProfileLoopOf } from "../profiles/loops/api";

const getQuestion = qid =>
  getFirebaseDataWithCache(`users/questions/${qid}/question`);

const getAnswer = (qid, uid) =>
  getFirebaseDataWithCache(`users/questions/${qid}/answers/${uid}/answer`);

const getCurrentQuestion = uid =>
  database.ref(`users/profile/${uid}/current_question_id`)
    .once('value').then(snap => snap.val())
    .then(qid =>
      getQuestion(qid).then(question => ({
        qid,
        question
      }))
    );

export const getPoolData = async(uid, q = {}) => {
  const receivedAnswer = (q.qid ? await getAnswer(q.qid, uid) : null);
  return {
    question: receivedAnswer ? q : await getCurrentQuestion(uid),
    profileLoop: await getProfileLoopOf(uid),
    receivedAnswer,
  };
};

export const questionSeen = (uid, qid) =>
  database.ref(`users/questions/${qid}/seen_by/${uid}`).set(true);

export const answer = (uid, qid, answer) =>
  database.ref(`users/questions/${qid}/answers/${uid}`).set({
    answer,
    timestamp,
  });

export const isAlreadyInPool = (uid) => state => false;
