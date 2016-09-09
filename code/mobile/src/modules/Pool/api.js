import { database, getFirebaseDataWithCache } from '../../core/Api';
import { getProfileLoop } from '../Profiles/api';

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


export const getPoolData = async (uid, current_question_id = null) => ({
  question: await getCurrentQuestion(uid),
  profileLoopPhotos: await getProfileLoop(uid),
  receivedAnswer: await getAnswer(current_question_id),
});


