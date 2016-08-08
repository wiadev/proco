const firebase = require('firebase');

const getReferenceForAction = (action, child = null) => {
  const ref = firebase.database().ref('queues').child(action);

  if (child === null) {
    return ref;
  } else if (['tasks', 'results', 'specs'].indexOf(child) === 0) {
    return ref.child(child);
  } else {
    throw 'Invalid child';
  }
};

export const Promised = (dispatched) => {

  const ref = getReferenceForAction(dispatched.action, 'results').child(dispatched.payload.key);

  return new Promise((resolve, reject) => {

    ref.on('value', (snapshot) => {

      const result = snapshot.val();

      if(result !== null) {

        resolve(Object.assign(dispatched, {
          result,
        }));

        ref.off();

      }

    });

  });

};

export const Dispatcher = (action, payload) => {

  const ref = getReferenceForAction(action, 'tasks').push();

  let data = {
    action,
    payload: Object.assign(payload, {
      key: ref.key,
    }),
  };

  return ref.set(data).then(() => {
    return data;
  });

};
