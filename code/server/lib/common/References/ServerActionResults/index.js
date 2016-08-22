"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ServerActionResults = exports.ServerActionResults = function ServerActionResults(data) {
  return "queues/" + data.action + "/results/" + data.payload.key;
};

exports.default = ServerActionResults;