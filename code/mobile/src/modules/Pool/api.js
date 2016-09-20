import { database, getFirebaseDataWithCache } from '../../core/Api';
import { getProfileLoopOf } from '../Profiles/Loops/api';

const getQuestion = qid =>
  getFirebaseDataWithCache(`users/questions/${qid}/question`);

const getAnswer = (qid, uid) =>
  getFirebaseDataWithCache(`users/questions/${qid}/answers/${uid}/answer`);

const getCurrentQuestion = uid =>
  database.ref(`users/summary/${uid}/current_question_id`)
    .once('value').then(snap => snap.val())
    .then(qid =>
      getQuestion(qid).then(question => ({
        qid,
        question
      }))
    );

export const getPoolData = async (uid, q = {}) => {
  const receivedAnswer = (q.qid ? await getAnswer(q.qid, uid) : null);
  return {
    question: receivedAnswer ? q : await getCurrentQuestion(uid),
    profileLoop: await getProfileLoopOf(uid),
    receivedAnswer,
  };
};
