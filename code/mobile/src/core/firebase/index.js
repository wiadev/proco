import { AsyncStorage, Image } from "react-native";
import firebase from "firebase";

export const base = firebase.initializeApp({
  apiKey: "AIzaSyCFOGhparb6dYAwoKtgvnHZ37hh0EARsOQ",
  authDomain: "proco-app.firebaseapp.com",
  databaseURL: "https://proco-app.firebaseio.com",
  storageBucket: "proco-app.appspot.com"
});

export const database = base.database();
export const storage = base.storage();
export const auth = base.auth();

export const facebookCredential = firebase.auth.FacebookAuthProvider.credential;
export const timestamp = firebase.database.ServerValue.TIMESTAMP;

export const refs = {};

export const getUserPath = (uid, child) => `users/${child}/${uid}`;
export const getUserRef = (uid, child) => database.ref(getUserPath(uid, child));
export const getFirebaseData = (ref) => database.ref(ref)
  .once('value')
  .then(snap => snap.val());

export const getFirebaseDataWithCache = ref => {
  const key = '@Proco:FDC:' + ref;
  return AsyncStorage.getItem(key).then(data => {
    if (data !== null) return JSON.parse(data);
    return getFirebaseData(ref)
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

export const getKey = () => database.ref('keyGenerator').push().key;

export const takeOnline = (uid) => {
  const isOnlineRef = database.ref(`users/summary/${uid}/is_online`);
  return isOnlineRef.set(true).then(() => isOnlineRef.onDisconnect().set(false));
};

export const getCUID = () => {
  const currentUser = base.auth().currentUser;
  return (currentUser ? currentUser.uid : null);
};
