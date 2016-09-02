import Rebase from "re-base";
import {AsyncStorage} from "react-native";

export const base = Rebase.createClass({
  apiKey: "AIzaSyCFOGhparb6dYAwoKtgvnHZ37hh0EARsOQ",
  authDomain: "proco-app.firebaseapp.com",
  databaseURL: "https://proco-app.firebaseio.com",
  storageBucket: "proco-app.appspot.com",
});

export const database = base.database();

export const getUserSummary = uid => {
  return new Promise((resolve, reject) => {
    const key = '@Proco:Users:Summary:' + uid;
    AsyncStorage.getItem(key).then(data => {
      if (data !== null) return resolve(JSON.parse(data));
      database.ref(`users/summary/${uid}`)
        .once('value')
        .then(snap => snap.val())
        .then(data => {
          if (!data) return reject('NO_SUCH_USER');
          AsyncStorage.setItem(key, JSON.stringify(data));
          resolve(data);
        });
    });
  });
};
