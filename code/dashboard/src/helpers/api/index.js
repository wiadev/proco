import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../config';

export const getFirebaseApp = (name = '[ADMIN]') => {
  var app;
  try {
    app = firebase.app(name);
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