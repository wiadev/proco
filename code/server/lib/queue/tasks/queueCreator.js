'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var firebase = require('firebase');

var getReferenceForAction = function getReferenceForAction(action) {
  var child = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  var ref = firebase.database().ref('queues').child(action);

  if (child === null) {
    return ref;
  } else if (['tasks', 'results', 'specs'].indexOf(child) === 0) {
    return ref.child(child);
  } else {
    throw 'Invalid child';
  }
};

var Promised = exports.Promised = function Promised(dispatched) {

  var ref = getReferenceForAction(dispatched.action, 'results').child(dispatched.payload.key);

  return new Promise(function (resolve, reject) {

    ref.on('value', function (snapshot) {

      var result = snapshot.val();

      if (result !== null) {
        resolve(Object.assign(dispatched, {
          result: result
        }));
        ref.off();
      }
    });
  });
};

var Dispatcher = exports.Dispatcher = function Dispatcher(action, payload) {

  var ref = getReferenceForAction(action, 'tasks').push();

  var data = {
    action: action,
    payload: Object.assign(payload, {
      key: ref.key
    })
  };

  return ref.set(data).then(function () {
    return data;
  });
};