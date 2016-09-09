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





export const changeMatchStatusFor = (uidToMatch, status = true) => {
  const uid = getCUID();
  const matchUpdates = {
    [`${uid}/${uidToMatch}`]: status,
    [`${uidToMatch}/${uid}`]: status,
  };
  return database.ref('users/matches').update(matchUpdates);
};

export const matchTo = (uid) => changeMatchStatusFor(uid, true).then(() => {

  const thread = threadsRef.child(`info`).push({
    people: [uid, getCUID()],
    created_at: base.database.ServerValue.TIMESTAMP,
  });

  return thread
    .then(() =>
      postMessage(thread.key, {
        _id: 0,
        text: `Congrats, it's a match!`,
        createdAt: base.database.ServerValue.TIMESTAMP,
        user: 'proco',
        type: 'matched-banner',
      }))
    .then(() => thread.key);

});
