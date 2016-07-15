const firebase = require('firebase');
const database = firebase.database();

const TASK_LIST = {
  'AFTER_LOGIN',
  'COMPLETE_ONBOARDING',
  'VERIFY_SCHOOL_EMAIL',
  'SEND_MESSAGE',
};

const tasks = database.ref('queues/client-tasks');

const runner = (task, payload = {}) => {

  return new Promise((resolve, reject) => {

    const currentUser = firebase.auth().currentUser;
    return currentUser.getToken().then((token) => {
      const resultsKey = `users/${currentUser.uid}/task-results`;
      const results = database.ref(resultsKey);

      const result = results.push();

      result.on('value', (snapshot) => {
        result.off();
        resolve(snapshot.val());
      });

      tasks.push({
        task,
        payload,
        token,
        resolveTo: `${resultsKey}/${result.key}`,
      });

    }).catch(function(error) {
      // Handle error
    });


  });

};

module.exports = runner;
