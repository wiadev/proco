'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.facebook = exports.testUsersRef = undefined;

var _utils = require('../../utils');

var _facebook2 = require('./facebook');

var _facebook = _interopRequireWildcard(_facebook2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var testUsersRef = exports.testUsersRef = function testUsersRef(fid) {
  return adminDatabase.ref('playhouse/test-users/' + (fid ? fid : ''));
};

exports.facebook = _facebook;
//# sourceMappingURL=index.js.map