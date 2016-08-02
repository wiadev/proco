const firebase = require('firebase');

const getReferenceForAction = (action, child = null) => {
  const ref = firebase.database().ref('queues').child(action);
  if (child === null) {
    return ref;
  } else if (['tasks', 'results', 'specs'].indexOf(child) > -1) {
    return ref.child(child);
  } else {
    throw 'Invalid child';
  }
};

export const Promised = (dispatched) => {

  return dispatched.then(data => {

    const ref = getReferenceForAction(data.action, 'results').child(data.payload.key);

    return new Promise((resolve, reject) => {

      ref.on('value', (snap) => {
        const result = snap.val();
        if (result !== null) {
          resolve(Object.assign(data, {
            result
          }));
          ref.off();
          ref.remove();
        }
      });
    })
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
