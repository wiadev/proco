'use strict';

var _firebase = require('firebase');

var firebase = _interopRequireWildcard(_firebase);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var TypeUtils = require('./TypeUtils');
var database = function database() {
    return firebase.database();
};
var getUserRef = function getUserRef(uid) {
    return database().ref('users/' + uid);
};
var getDataFromRef = function getDataFromRef(ref) {
    return ref.once('value').then(function (snap) {
        return snap.val();
    });
};

var getCode = function getCode() {
    return Math.floor(Math.random() * 900000) + 100000;
};

var worker = function worker(data, progress, resolve, reject) {
    var _TypeUtils$data$paylo = TypeUtils[data.payload.type];
    var verifier = _TypeUtils$data$paylo.verifier;
    var sender = _TypeUtils$data$paylo.sender;

    var userRef = getUserRef(data.payload.uid);

    verifier(data.payload.to).then(function (to) {
        var code = getCode();
        return userRef.child('verifications/' + data.payload.type + '/' + code).set({
            time: Date.now()
        }).then(function () {
            return sender(to, code).then(function (data) {
                console.log("data", data);
                resolve();
            }).catch(function (e) {
                return console.log(e);
            });
        });
    });
};

var key = 'USER_VERIFICATION';
module.exports = {
    worker: worker,
    key: key
};