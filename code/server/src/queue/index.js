import FirebaseQueue from 'firebase-queue';
import * as firebase from 'firebase';
const serviceAccount = require('../../../../config/FirebaseCredentials.json');

firebase.initializeApp({
  serviceAccount,
  databaseURL: 'https://hello-4c376.firebaseio.com'
});

const Tasks = [
    require('./tasks/USER_FIRST_LOGIN')
];
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

console.log(Tasks)

Tasks.forEach(task => {
    worker(task);
});