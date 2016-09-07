import Rebase from "re-base";
import {AsyncStorage, Image} from "react-native";
import {getCUID, postMessage} from "../../modules/User/actions";

export const base = Rebase.createClass({
  apiKey: "AIzaSyCFOGhparb6dYAwoKtgvnHZ37hh0EARsOQ",
  authDomain: "proco-app.firebaseapp.com",
  databaseURL: "https://proco-app.firebaseio.com",
  storageBucket: "proco-app.appspot.com",
});

export const database = base.database();
export const storage = base.storage();

export const threadsRef = database.ref('threads');

export const getFirebaseDataWithCache = ref => {
  const key = '@Proco:FDC:' + ref;
  return AsyncStorage.getItem(key).then(data => {
    if (data !== null) return JSON.parse(data);
    return database.ref(ref)
      .once('value')
      .then(snap => snap.val())
      .then(data => {
        if (!data) return null;
        AsyncStorage.setItem(key, JSON.stringify(data));
        return data;
      });
  });
};

export const getLoopsWithCache = (uid, loop_key = 0, count = 18) => {
  const key = `@Proco:FSC:PLP:${uid}:${loop_key}`;
  return AsyncStorage.getItem(key).then(data => {
    if (data !== null) return JSON.parse(data);
    if (loop_key === 0) uid = 0;
    const loopBaseRef = storage.ref(`users/loops/${uid}/${loop_key}`);
    let files = [];
    for (var i = 0; i < count; i++) {
      files.push(loopBaseRef.child(`${i}.jpg`).getDownloadURL());
    }
    return Promise.all(files).then(links => {
      links.forEach(link => Image.prefetch(link));
      AsyncStorage.setItem(key, JSON.stringify(links));
      return links;
    });
  });
};

export const getUserLoops = (uid, loop_key = null, count = 18) => {
  if (loop_key) return getLoopsWithCache(uid, loop_key, count);
  return database.ref(`users/summary/${uid}/loop_key`) // Don't use cache here, it may change
    .once('value')
    .then(snap => snap.val())
    .then(key => getLoopsWithCache(uid, (key || 0), count));
};

export const getUserSummary = uid => getFirebaseDataWithCache(`users/summary/${uid}`);

export const getCurrentQuestionOf = uid =>
  database.ref(`users/summary/${uid}/current_question_id`)
    .once('value').then(snap => snap.val())
    .then(qid =>
      getQuestion(qid).then(question => ({
        qid,
        question
      }))
    );

export const getQuestion = qid => getFirebaseDataWithCache(`users/questions/${qid}/question`);
export const getAnswer = (qid, uid) => getFirebaseDataWithCache(`users/questions/${qid}/answers/${uid}/answer`);
export const getNetworkTitle = network => getFirebaseDataWithCache(`settings/networks/list/${network}/title`);

export const getAnswerForCUQ = async(uid) => {
  const CUINFO = JSON.parse(await AsyncStorage.getItem('@Proco:CU:INFO'));
  if (CUINFO.current_question_id) return await getAnswer(CUINFO.current_question_id, uid);
  return null;
};

export const getPoolData = async(uid) => ({
  question: await getCurrentQuestionOf(uid),
  loops: await getUserLoops(uid),
  answer: await getAnswerForCUQ(uid),
});

export function postAnswer(qid, answer) {
  const uid = getCUID();
  return database.ref(`users/questions/${qid}/answers/${uid}`).set({
    answer,
    timestamp: base.database.ServerValue.TIMESTAMP,
  });
}


export const markAsSeen = (uid, qid, cuid = getCUID()) =>
  database.ref(`users/questions/${qid}/seen_by/${cuid}`)
    .set(true)
    .then(() => database.ref(`pools/${cuid}/${uid}`).set(null));

export const changeBlockStatusFor = (user, status = true) =>
  database.ref(`users/blocks/${getCUID()}/${user}`).set(status);

export const changeMatchStatusFor = (uidToMatch, status = true) => {
  const uid = getCUID();
  const matchUpdates = {
    [`${uid}/${uidToMatch}`]: status,
    [`${uidToMatch}/${uid}`]: status,
  };
  return database.ref('users/matches').update(matchUpdates);
};

export const matchTo = (uid) => changeMatchStatusFor(uid, true).then(() => {

  const thread = threadsRef.child(`info`).set({
    to: [uid, getCUID()],
    created_at: base.database.ServerValue.TIMESTAMP,
  });

  return thread
    .then(() => postMessage(thread.key, {
      _id: 0,
      text: `Congrats, it's a match!`,
      createdAt: base.database.ServerValue.TIMESTAMP,
      user: 'proco',
      type: 'matched-banner',
    }))
    .then(() => thread.key);

});

export const changeMuteStatusFor = (user, status = true) =>  // We mute by user, not message or thread
  database.ref(`users/inbox/${getCUID()}/${user}/is_muted`).set(status);
