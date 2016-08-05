const firebase = require('firebase');

export const FirebaseInit = () => {

  try {
    firebase.app();
  } catch(e) {
    firebase.initializeApp({
      apiKey: "AIzaSyDtebbExST_vz3cMMy_YLdIrNNKohIGlNc",
      authDomain: "hello-4c376.firebaseapp.com",
      databaseURL: "https://hello-4c376.firebaseio.com",
      storageBucket: "hello-4c376.appspot.com",
    });
  }

};

export const getFirebaseDB = () => firebase.database();
