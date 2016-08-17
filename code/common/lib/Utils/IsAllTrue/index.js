"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var IsAllTrue = function IsAllTrue(arr) {
  return arr.every(function (el) {
    return Boolean(el) == true;
  });
};
exports.default = IsAllTrue;