'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserRef = exports.database = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _firebase = require('firebase');

var firebase = _interopRequireWildcard(_firebase);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var database = exports.database = function database() {
  return firebase.database();
};
var getUserRef = exports.getUserRef = function getUserRef(uid) {
  return database().ref('users/' + uid);
};

var worker = function worker(data, progress, resolve, reject) {

  var userRef = getUserRef(data.payload.uid);

  var tokenRef = userRef.child('tokens/facebook_token');
  var infoRef = userRef.child('info');
  tokenRef.once('value', function (snap) {

    var access_token = snap.val();

    if (!access_token) {
      return reject();
    }

    _axios2.default.get('https://graph.facebook.com/v2.7/me', {
      params: {
        fields: ['id', 'name', 'birthday', 'gender', 'age_range', 'first_name', 'last_name'].join(','),
        access_token: access_token
      }
    }).then(function (response) {

      if (response < 200 || response > 399) {
        return reject();
      }

      var _response$data = response.data;
      var id = _response$data.id;
      var name = _response$data.name;
      var gender = _response$data.gender;
      var age_range = _response$data.age_range;
      var first_name = _response$data.first_name;
      var last_name = _response$data.last_name;
      var birthday = _response$data.birthday;


      var user = {
        fid: id,
        name: name,
        gender: gender,
        age_range_on_facebook: age_range,
        first_name: first_name,
        last_name: last_name
      };

      if (birthday) {
        var _birthday = birthday.split('/');
        user.birthday = _birthday[1] + '/' + _birthday[0] + '/' + _birthday[2];
        user.birthyear = _birthday[2];
      }

      infoRef.set(user).then(function () {
        resolve();
      });
    }).catch(function (e) {
      return console.log("err", e);
    });
  });
};

var key = 'USER_FIRST_LOGIN';
module.exports = {
  worker: worker,
  key: key
};