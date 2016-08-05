'use strict';

var firebase = require('firebase');

var Queue = require('firebase-queue');

firebase.initializeApp({
    serviceAccount: './credentials.json',
    databaseURL: 'https://hello-4c376.firebaseio.com/'
});

var database = firebase.database();

var Tasks = require('./tasks');

var worker = function worker(task) {

    console.log('Starting the queue for ', task.key);

    var ref = database.ref('queues').child(task.key);

    var queue = new Queue(ref, task.worker);

    process.on('SIGINT', function () {
        console.log('Starting queue shutdown');
        queue.shutdown().then(function () {
            console.log('Finished queue shutdown');
            process.exit(0);
        });
    });
};

var taskList = process.env.TASKS ? process.env.TASKS.split(',') : Object.keys(Tasks);

taskList.forEach(function (task) {
    worker(Object.assign({
        parent: database.ref('queues')
    }, Tasks[task]));
});