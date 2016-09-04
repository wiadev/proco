import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../config';

export const getFirebaseApp = (name = '[ADMIN]') => {
  var app;
  try {
    app = firebase.app(uid);
  }
  catch(e) {
    app = firebase.initializeApp(FIREBASE_CONFIG, name);
  }
  return app;
};

export const adminApp = getFirebaseApp();
export const adminDatabase = adminApp.database();
export const adminAuth = adminApp.auth();

export const userApp = (uid) => getFirebaseApp(`user[${uid}]`);
export const userDatabase = (uid) => userApp(uid).database();
export const userAuth = (uid) => userApp(uid).auth();

const genericUserApp = getFirebaseApp('[GENERIC]');
const genericUserAuth = genericUserApp.auth();

export const loginAsTestUser = ({location: { query: {access_token = null} }}, replace, cb) => {

  if (access_token) {
    const credential = firebase.auth.FacebookAuthProvider.credential(access_token);
    genericUserAuth.signOut().then(() => genericUserAuth.signInWithCredential(credential).then(user => {
      if (!user) return Promise.reject('DUNNO_WHAT_HAPPENED');
      console.log("once", user)
      return userAuth(user.uid).signInWithCredential(credential).then(user => {
        console.log("twice", user)
        let afterLoginActions = [];
        afterLoginActions.push(userDatabase(user.uid).ref(`users/tokens/${user.uid}/facebook`).set(access_token));
        afterLoginActions.push(adminDatabase.ref(`internal/playhouse/test-users/${user.providerData[0].id}`).set(user.uid));
        afterLoginActions.push(genericUserAuth.signOut());
        return Promise.all(afterLoginActions).then(() => {
          replace('/test-users/' + user.uid);
          cb();
          return Promise.resolve();
        });
      });
    })).catch(function(error) {
      console.log("Here's that error that made that annoying alert: ", error);
      alert("An error occurred. Check the console.");
    });
  } else {
    alert("No access token was given. Are you here by accident?");
    replace('/');
    cb();
  }

};

export const loginAsAdmin = ({location: { query: {token = null} }}, replace, cb) => {

  if (token) {
    adminAuth.signInWithCustomToken(token).then(user => {
      replace('/test-users');
      cb();
    }).catch(function(error) {
      console.log("Here's that error that made that annoying alert: ", error);
      alert("An error occurred. Check the console.");
    });
  } else {
    alert("No token was given. Are you here by accident?");
    replace('/');
    cb();
  }

};
