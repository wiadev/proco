/**
 * Queued Middleware
 * Handles Redux Actions that have 'queued' attribute.
 */

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

export function serverActionMiddleware() {

  return ({ getState }) => {

    return next => action => {

      if (action.type === 'SERVER_ACTION' || action.type === 'SERVER_PROMISED_ACTION' ) {
        const { payload, type, after } = action.payload;

        const ref = getReferenceForAction(action, 'tasks').push();

        const { auth } = getState();

        let data = {
          action,
          payload: Object.assign(payload, {
            key: ref.key,
            uid: auth.get('uid')
          }),
        };

        let results = ref.set(data).then(() => {
          return data;
        });

        if (action.type === 'SERVER_PROMISED_ACTION') {
            results = results.then((data) => {
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
              });
            });
        }

        results.then(data => after(data));

        return results;

      } else {
        return next(action);
      }

    };

  };

}