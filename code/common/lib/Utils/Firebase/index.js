'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getDataFromRef = exports.getDataFromRef = function getDataFromRef(ref) {
  return ref.once('value').then(function (snap) {
    return snap.val();
  });
};