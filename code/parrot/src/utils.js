import firebase from 'firebase';
import axios from 'axios';

export const asArray = (obj) => Object.keys(obj).map((k) => obj[k]);

const serviceAccount = require('../config/proco-service-account.json');

export const firebaseAppROOT = firebase.initializeApp({
  databaseURL: "https://proco-app.firebaseio.com",
  serviceAccount
}, 'ROOT');

export const getFirebaseApp = (uid) => {
  if(!uid) console.error('YOU NEED TO SPECIFY AN UID'); return;
  var app;
  try {
    app = firebase.app(uid);
  }
  catch(e) {
    app = firebase.initializeApp({
      databaseURL: "https://proco-app.firebaseio.com",
      serviceAccount,
      databaseAuthVariableOverride: {
        uid
      }
    }, uid);
  }
  return app;
};

export const database = firebaseAppROOT.database();
export const databaseFor = (uid) => getFirebaseApp(uid).database();

export const FACEBOOK_API_CONFIG = {
	appID: '1169837529717559',
	appSecret: '85dca638c5c065f955c4cc0522c66d41',
	appAccessToken: '1169837529717559|NpUPQjrjLsUVJb-Lx2nm4n1qJBI',
};

export const fb = axios.create({
  baseURL: 'https://graph.facebook.com/v2.7/',
  params: {'access_token': FACEBOOK_API_CONFIG.appAccessToken}
});
