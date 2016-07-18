import codePush from "react-native-code-push";

const Onboarding = require('./Onboarding');
const Authentication = require('./Authentication');

const Initiliazer = (obj = {}) => {
  codePush.sync();

  try {
    firebase.app(); // Check if the app exists 
  }
  catch(err) {
     firebase.initializeApp({
      apiKey: "AIzaSyDtebbExST_vz3cMMy_YLdIrNNKohIGlNc",
      authDomain: "hello-4c376.firebaseapp.com",
      databaseURL: "https://hello-4c376.firebaseio.com",
      storageBucket: "hello-4c376.appspot.com",
    });
  }

  firebase.auth().onAuthStateChanged((user) => {
    console.log("user", user);
  });

};

const handleAppStateChange = (appState) => {
  if (appState === 'active') Initiliazer();
};

module.exports = {
  handleAppStateChange,
  Authentication,
  Onboarding,
};