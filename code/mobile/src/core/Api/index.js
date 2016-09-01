import Rebase from 're-base';

export const base = Rebase.createClass({
  apiKey: "AIzaSyCFOGhparb6dYAwoKtgvnHZ37hh0EARsOQ",
  authDomain: "proco-app.firebaseapp.com",
  databaseURL: "https://proco-app.firebaseio.com",
  storageBucket: "proco-app.appspot.com",
});

export const database = base.database();
