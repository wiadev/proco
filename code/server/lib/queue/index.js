'use strict';

var _firebaseQueue = require('firebase-queue');

var _firebaseQueue2 = _interopRequireDefault(_firebaseQueue);

var _firebase = require('firebase');

var firebase = _interopRequireWildcard(_firebase);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serviceAccount = require('../../../../config/FirebaseCredentials.json');

firebase.initializeApp({
    serviceAccount: serviceAccount,
    databaseURL: 'https://hello-4c376.firebaseio.com'
});

var Tasks = [require('./tasks/USER_FIRST_LOGIN')];
var database = firebase.database();

var worker = function worker(task) {

    console.log('Starting the queue for ' + task.key);

    var ref = database.ref('queues/' + task.key);
    var queue = new _firebaseQueue2.default(ref, task.worker);

    process.on('SIGINT', function () {
        console.log('Starting queue shutdown');
        queue.shutdown().then(function () {
            console.log('Finished queue shutdown');
            process.exit(0);
        });
    });
};

console.log(Tasks);

Tasks.forEach(function (task) {
    worker(task);
});