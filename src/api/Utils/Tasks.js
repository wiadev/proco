const firebase = require('firebase');
const database = firebase.database();
const ref = database.ref('queues/client-actions');

const getActionTasksReference = (action) => {
  return ref.child('tasks').child(action);
};

const getActionResultsReference = (action) => {
  return ref.child('results').child(action);
};

const promised = (dispatched) => {
  const ref = getActionResultsReference(dispatched.action).child(dispatched.key);
  return ref.on('once').then(snapshot => Object.assign(dispatched, {
    results: snapshot.val()
  }));
};

const dispatch = (action, payload, files) => {

  const ref = getActionTasksReference(action).push();

  const data = {
    action,
    payload,
    files,
    key: ref.key
  };

  const set = (data) => {
    return ref.set(data).then(() => {
      return data;
    });
  };

  if (files) {
    const uploads = Object.keys(files).map((file) => {
      return new Promise((resolve, reject) => {
        return upload(files[file]).then(file => file.id);
      });
    });

    return Promise.all(uploads).then((files) => {
      return set(Object.assign(data, {
        files
      }));
    });
  }

  return set(data);

};


module.exports = {
  promised,
  dispatch
};


