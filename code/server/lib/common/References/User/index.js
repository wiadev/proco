"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getUserRef = function getUserRef(uid) {
  var child = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  var ref = "users/" + uid;
  if (!child) return ref;
  return ref + "/" + child;
};
exports.default = getUserRef;