import { database, timestamp, getFirebaseDataWithCache } from "../../core/firebase";
import { getProfileLoopOf } from "../profiles/loops/api";
import { block, report, match} from "../profiles/actions";
import { answer as answerAction } from "./actions";

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

export const setAnswer = (uid, qid, answer) =>
  database.ref(`users/questions/${qid}/answers/${uid}`).set({
    answer,
    timestamp,
  });

export const isAlreadyInPool = (uid) => state => false;

export const decideAction = (uid, act, payload = {}) => {
  switch (act) {
    case 'report':
      return report(uid, assign({
        ref: 'pool',
      }));
      break;
    case 'block':
      return block(uid, {
        ref: 'pool',
      });
      break;
    case 'match':
      return match(uid);
      break;
    case 'answer':
      return answerAction(payload.qid, payload.answer);
      break;
    default:
      return {};
      break;
  }
};

export const removeFromPool = (uid, user_key, loop_key) =>
  database.ref(`ocean/pools/${uid}/${user_key}`).set(null);

export const resetPool = (uid) =>
  database.ref(`ocean/statuses/${uid}`).set({
    status: 'IN_PROGRESS_RESET',
    last_checked: timestamp,
  });
