import Rebase from "re-base";
import {AsyncStorage} from "react-native";

export const base = Rebase.createClass({
  apiKey: "AIzaSyCFOGhparb6dYAwoKtgvnHZ37hh0EARsOQ",
  authDomain: "proco-app.firebaseapp.com",
  databaseURL: "https://proco-app.firebaseio.com",
  storageBucket: "proco-app.appspot.com",
});

export const database = base.database();
base.database.enableLogging(true);

export const getFirebaseDataWithCache = ref => {
  return new Promise((resolve) => {
    const key = '@Proco:FDC:' + ref;
    AsyncStorage.getItem(key).then(data => {
      if (data !== null) return resolve(JSON.parse(data));
      database.ref(ref)
        .once('value')
        .then(snap => snap.val())
        .then(data => {
          if (!data) return resolve(null);
          AsyncStorage.setItem(key, JSON.stringify(data));
          resolve(data);
        });
    });
  });
};

export const getUserSummary = uid => getFirebaseDataWithCache(`users/summary/${uid}`);
export const getNetworkTitle = network => getFirebaseDataWithCache(`settings/networks/list/${network}/title`);
