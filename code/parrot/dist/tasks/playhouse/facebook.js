'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFacebookTestUserProfile = exports.getFacebookTestUserProfile = exports.syncFacebookTestUserPasswords = exports.syncFacebookTestUserProfiles = exports.syncFacebookTestUsersWithApp = exports.cleanFacebookTestUsersFromApp = exports.syncFacebookTestUserList = exports.getAccessTokenFor = exports.deleteFacebookTestUser = exports.createFacebookTestUser = exports.getAllFacebookTestUsers = undefined;

var _utils = require('../../utils');

var _appUsers = require('../appUsers');

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testUsersRef = function testUsersRef(fid) {
  return _utils.database.ref('internal/playhouse/test-users/' + (fid ? fid : ''));
};

var getFakeHuman = function getFakeHuman() {
  return { name: _faker2.default.name.findName() };
};

var getAllFacebookTestUsers = exports.getAllFacebookTestUsers = function getAllFacebookTestUsers() {
  var previous = arguments.length <= 0 || arguments[0] === undefined ? { data: [], next: null } : arguments[0];
  return _utils.fb.get(previous.next ? previous.next : _utils.FACEBOOK_API_CONFIG.appID + '/accounts/test-users').then(function (data) {
    return data.data;
  }).then(function (data) {
    var users = previous.data.concat(data.data);
    if (data.paging && data.paging.next) {
      return getAllFacebookTestUsers({ data: users, next: data.paging.next });
    }
    return users;
  });
};

var createFacebookTestUser = exports.createFacebookTestUser = function createFacebookTestUser() {
  var fields = arguments.length <= 0 || arguments[0] === undefined ? {
    installed: true,
    permissions: ['public_profile', 'user_likes', 'user_friends', 'user_birthday'].join(','),
    name: _faker2.default.name.findName()
  } : arguments[0];
  var addToFirebase = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
  return _utils.fb.post(_utils.FACEBOOK_API_CONFIG.appID + '/accounts/test-users', fields).then(function (data) {
    return data.data;
  }).then(function (data) {
    if (!addToFirebase) return data;
    return testUsersRef(data.id).set(data);
  });
};

var deleteFacebookTestUser = exports.deleteFacebookTestUser = function deleteFacebookTestUser(fid) {
  return _utils.fb.delete(fid).then(function () {
    return testUsersRef.child(fidid).set(null);
  });
};

var getAccessTokenFor = exports.getAccessTokenFor = function getAccessTokenFor(fid) {
  return testUsersRef(fid).child('access_token').once('value').then(function (snap) {
    return snap.val();
  }).then(function (data) {
    syncFacebookTestUserList(); // Tokens expire as soon as they are used. We'll refresh after using one.
    return data;
  });
};

var syncFacebookTestUserList = exports.syncFacebookTestUserList = function syncFacebookTestUserList() {
  return getAllFacebookTestUsers().then(function (users) {
    return Promise.all(users.map(function (user) {
      return testUsersRef(user.id).update(user);
    })).then(function () {
      return users.length;
    });
  });
};

var cleanFacebookTestUsersFromApp = exports.cleanFacebookTestUsersFromApp = function cleanFacebookTestUsersFromApp() {
  return getAllFacebookTestUsers().then(function (users) {
    return Promise.all(users.map(function (user) {
      return (0, _appUsers.cleanAppUser)('doll' + user.id);
    })).then(function () {
      return users.length;
    });
  });
};

var syncFacebookTestUsersWithApp = exports.syncFacebookTestUsersWithApp = function syncFacebookTestUsersWithApp() {
  return getAllFacebookTestUsers().then(function (users) {
    return Promise.all(users.map(function (user) {
      return _utils.database.ref('users/tokens/doll' + user.id + '/facebook').set(user.access_token).then(function () {
        return _utils.database.ref('users/info/doll' + user.id + '/email').set(user.id + '@dolls.procoapp.com').then(function () {
          return _utils.database.ref('users/is/doll' + user.id + '/network_email_verified').set(true);
        });
      });
    })).then(function () {
      return users.length;
    });
  });
};

var syncFacebookTestUserProfiles = exports.syncFacebookTestUserProfiles = function syncFacebookTestUserProfiles() {
  return testUsersRef().once('value').then(function (snap) {
    return snap.val();
  }).then(function (data) {
    return data ? (0, _utils.asArray)(data) : [];
  }).then(function (users) {
    return Promise.all(users.map(function (user) {
      return getFacebookTestUserProfile(user.id).then(function (fbuser) {
        return testUsersRef(user.id).update(fbuser);
      });
    })).then(function () {
      return users.length;
    });
  });
};

var syncFacebookTestUserPasswords = exports.syncFacebookTestUserPasswords = function syncFacebookTestUserPasswords() {
  var password = arguments.length <= 0 || arguments[0] === undefined ? 'bar123bar.' : arguments[0];
  return testUsersRef().once('value').then(function (snap) {
    return snap.val();
  }).then(function (data) {
    return data ? (0, _utils.asArray)(data) : [];
  }).then(function (users) {
    return Promise.all(users.map(function (user) {
      return setFacebookTestUserProfile(user.id, {
        password: password
      });
    })).then(function () {
      return users.length;
    });
  });
};

var getFacebookTestUserProfile = exports.getFacebookTestUserProfile = function getFacebookTestUserProfile(fid) {
  return _utils.fb.get(fid, {
    params: {
      fields: ['id', 'name', 'birthday', 'gender', 'age_range', 'first_name', 'last_name', 'email'].join(',')
    }
  }).then(function (data) {
    return data.data;
  });
};

var setFacebookTestUserProfile = exports.setFacebookTestUserProfile = function setFacebookTestUserProfile(fid) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return _utils.fb.post(fid, data).then(function (data) {
    return true;
  });
};

exports.default = _utils.fb;
//# sourceMappingURL=facebook.js.map