import FirebaseQueue from 'firebase-queue';
import Tasks from './tasks';
import * as firebase from'firebase';
const serviceAccount = require('../../../config/FirebaseCredentials.json');

firebase.initializeApp({
  serviceAccount,
  databaseURL: 'https://hello-4c376.firebaseio.com'
});

const database = firebase.database();

const worker = (task) => {

    console.log(`Starting the queue for ${task.key}`);

    const ref = database.ref(`queues/${task.key}`);
    const queue = new FirebaseQueue(ref, task.worker);

    process.on('SIGINT', () => {
        console.log('Starting queue shutdown');
        queue.shutdown().then(() => {
            console.log('Finished queue shutdown');
            process.exit(0);
        });
    });

};

const taskList = process.env.TASKS ? process.env.TASKS.split(',') : Object.keys(Tasks);

taskList.forEach(task => {
    worker(Tasks[task]);
});