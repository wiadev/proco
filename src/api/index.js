const firebase = require('firebase');
const Onboarding = require('./Onboarding');
const Authentication = require('./Authentication');

const Initiliazer = (obj = {}) => {

  firebase.initializeApp({
    apiKey: "AIzaSyDtebbExST_vz3cMMy_YLdIrNNKohIGlNc",
    authDomain: "hello-4c376.firebaseapp.com",
    databaseURL: "https://hello-4c376.firebaseio.com",
    storageBucket: "hello-4c376.appspot.com",
  });

  firebase.auth().onAuthStateChanged((user) => {
    console.log("user", user);
    if(!user) {

    }

    if(obj.onAuthState) obj.onAuthState(user);
  });


};

module.exports = {
  Initiliazer,
  Authentication,
  Onboarding,

};
