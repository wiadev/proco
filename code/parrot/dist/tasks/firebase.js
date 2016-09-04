'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setGroupMembership = exports.listMembersFor = exports.resetAccess = exports.listGroupsFor = exports.isInGroup = exports.createCustomToken = undefined;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serviceAccount = require('../../config/proco-service-account.json');

_firebase2.default.initializeApp({
  databaseURL: "https://proco-app.firebaseio.com",
  serviceAccount: serviceAccount
});

var database = _firebase2.default.database();
var internalRef = database.ref('internal');
var groupsRef = database.ref('internal/acl/groups');
var usersRef = database.ref('internal/acl/users');

var createCustomToken = exports.createCustomToken = function createCustomToken(uid) {
  var additionalClaims = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return _firebase2.default.auth().createCustomToken(uid, additionalClaims);
};

var isInGroup = exports.isInGroup = function isInGroup(uid, group) {
  return groupsRef.child(group).child(uid).once('value').then(function (data) {
    return data.val() ? true : false;
  });
};

var listGroupsFor = exports.listGroupsFor = function listGroupsFor(uid) {
  return usersRef.child(uid).once('value').then(function (data) {
    return data.val();
  }).then(function (data) {
    return data ? Object.keys(data) : [];
  });
};

var resetAccess = exports.resetAccess = function resetAccess(uid) {
  return usersRef.child(uid).once('value').then(function (data) {
    var groups = data.val();
    if (!groups) return true;
    var updates = {};
    Object.keys(groups).forEach(function (group) {
      updates[group + '/' + uid] = null;
    });
    return groupsRef.update(updates).then(function () {
      return usersRef.child(uid).set(null);
    });
  });
};

var listMembersFor = exports.listMembersFor = function listMembersFor(group) {
  return groupsRef.child(group).once('value').then(function (data) {
    return data ? Object.keys(data.val()) : [];
  });
};

var setGroupMembership = exports.setGroupMembership = function setGroupMembership(uid, group, to) {
  return usersRef.child(uid).child(group).set(to).then(function () {
    return groupsRef.child(group).child(uid).set(to);
  });
};
//# sourceMappingURL=firebase.js.map