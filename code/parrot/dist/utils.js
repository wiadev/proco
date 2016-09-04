'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fb = exports.FACEBOOK_API_CONFIG = exports.databaseFor = exports.database = exports.getFirebaseApp = exports.firebaseAppROOT = exports.asArray = undefined;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asArray = exports.asArray = function asArray(obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var serviceAccount = require('../config/proco-service-account.json');

var firebaseAppROOT = exports.firebaseAppROOT = _firebase2.default.initializeApp({
  databaseURL: "https://proco-app.firebaseio.com",
  serviceAccount: serviceAccount
}, 'ROOT');

var getFirebaseApp = exports.getFirebaseApp = function getFirebaseApp(uid) {
  if (!uid) console.error('YOU NEED TO SPECIFY AN UID');return;
  var app;
  try {
    app = _firebase2.default.app(uid);
  } catch (e) {
    app = _firebase2.default.initializeApp({
      databaseURL: "https://proco-app.firebaseio.com",
      serviceAccount: serviceAccount,
      databaseAuthVariableOverride: {
        uid: uid
      }
    }, uid);
  }
  return app;
};

var database = exports.database = firebaseAppROOT.database();
var databaseFor = exports.databaseFor = function databaseFor(uid) {
  return getFirebaseApp(uid).database();
};

var FACEBOOK_API_CONFIG = exports.FACEBOOK_API_CONFIG = {
  appID: '1169837529717559',
  appSecret: '85dca638c5c065f955c4cc0522c66d41',
  appAccessToken: '1169837529717559|NpUPQjrjLsUVJb-Lx2nm4n1qJBI'
};

var fb = exports.fb = _axios2.default.create({
  baseURL: 'https://graph.facebook.com/v2.7/',
  params: { 'access_token': FACEBOOK_API_CONFIG.appAccessToken }
});
//# sourceMappingURL=utils.js.map