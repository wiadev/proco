const firebase = require('firebase');

const Queue = require('firebase-queue');

firebase.initializeApp({
    serviceAccount: './credentials.json',
    databaseURL: 'https://hello-4c376.firebaseio.com/'
});

const database = firebase.database();

const Tasks = require('./tasks');

const worker = (task) => {

    console.log('Starting the queue for ', task.key);

    const ref = database.ref('queues').child(task.key);

    const queue = new Queue(ref, task.worker);

    process.on('SIGINT', function () {
        console.log('Starting queue shutdown');
        queue.shutdown().then(function () {
            console.log('Finished queue shutdown');
            process.exit(0);
        });
    });

};

const taskList = process.env.TASKS ? process.env.TASKS.split(',') : Object.keys(Tasks);

taskList.forEach(task => {
    worker(Object.assign({
        parent: database.ref('queues')
    }, Tasks[task]));
});