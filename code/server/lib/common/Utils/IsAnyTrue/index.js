"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var IsAnyTrue = function IsAnyTrue(arr) {
  return arr.some(function (el) {
    return Boolean(el) == true;
  });
};
exports.default = IsAnyTrue;