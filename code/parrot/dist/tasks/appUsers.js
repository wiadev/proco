'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanAppUser = undefined;

var _utils = require('../utils');

var cleanAppUser = exports.cleanAppUser = function cleanAppUser(uid) {
  var getRef = function getRef(type) {
    return _utils.database.ref('/users/' + type + '/' + uid);
  };
  var refs = ['info', 'settings', 'questions', 'loops', 'filters', 'tokens', 'summary', 'is'];
  Promise.all(refs.map(function (ref) {
    return getRef(ref).set(null);
  }));
};
//# sourceMappingURL=appUsers.js.map