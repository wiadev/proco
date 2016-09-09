import {AsyncStorage, Image} from "react-native";
import firebase from "firebase";

export const base = firebase.initializeApp({
  apiKey: "AIzaSyCFOGhparb6dYAwoKtgvnHZ37hh0EARsOQ",
  authDomain: "proco-app.firebaseapp.com",
  databaseURL: "https://proco-app.firebaseio.com",
  storageBucket: "proco-app.appspot.com"
});

export const database = base.database();
export const storage = base.storage();

export const timestamp = base.database.ServerValue.TIMESTAMP;

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

export const getNetworkTitle = network => getFirebaseDataWithCache(`settings/networks/list/${network}/title`);

export const logEvent = (type, payload = {}) =>
  database.ref(`logs/${type}`).push(Object.assign({
    uid: base.auth().currentUser.uid,
    timestamp
  }, payload));
