import Rebase from "re-base";
import {AsyncStorage, Image} from "react-native";

export const base = Rebase.createClass({
  apiKey: "AIzaSyCFOGhparb6dYAwoKtgvnHZ37hh0EARsOQ",
  authDomain: "proco-app.firebaseapp.com",
  databaseURL: "https://proco-app.firebaseio.com",
  storageBucket: "proco-app.appspot.com",
});

export const database = base.database();
export const storage = base.storage();

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

export const getLoopsWithCache = (uid, loop_key, count = 18) => {
  const key = `@Proco:FSC:PLP:${uid}:${loop_key}`;
  return AsyncStorage.getItem(key).then(data => {
    if (data !== null) return JSON.parse(data);
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
    .then(key => getLoopsWithCache(uid, key, count));
};

export const getUserSummary = uid => getFirebaseDataWithCache(`users/summary/${uid}`);

export const getQuestion = qid => getFirebaseDataWithCache(`users/questions/${qid}`);
export const getAnswer = (qid, uid) => getFirebaseDataWithCache(`users/questions/${qid}/answers/${uid}/text`);

export const getNetworkTitle = network => getFirebaseDataWithCache(`settings/networks/list/${network}/title`);
