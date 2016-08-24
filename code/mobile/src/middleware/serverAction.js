/**
 * Queued Middleware
 * Handles Redux Actions that have 'queued' attribute.
 */

import { database } from '../core/Api';

const getReferenceForAction = (action, child = null) => {
  const ref = database().ref(`queues/${action}`);
  if (child === null) {
    return ref;
  } else if (['tasks', 'results', 'specs'].indexOf(child) > -1) {
    return ref.child(child);
  } else {
    throw 'Invalid child';
  }
};

export default function serverActionMiddleware() {

  return ({ getState }) => {

    return next => action => {

      if (action.type === 'SERVER_ACTION' || action.type === 'SERVER_PROMISED_ACTION' ) {
        const { payload = {}, type, after } = action.payload;

        if (!type) throw new 'You can\'t trigger a server action without a type';

        const ref = getReferenceForAction(type, 'tasks').push();

        const { auth } = getState();

        let data = {
          action: type,
          payload: Object.assign(payload, {
            key: ref.key,
            uid: auth.uid,
          }),
        };

        let results = ref.setValue(data).then(() => {
          return data;
        });

        if (after) {
          if (action.type === 'SERVER_PROMISED_ACTION') {
          results = results.then((data) => {
            const ref = getReferenceForAction(data.action, 'results').child(data.payload.key);

            return new Promise((resolve, reject) => {
              const off = ref.on('value', async (snap) => {
                  const result = await snap.val();
                  if (result !== null) {
                    resolve(Object.assign(data, {
                      result
                    }));
                    off();
                  }
              });
            });
          });
        }
          results.then(data => after(data));
        }

        return results;

      } else {
        return next(action);
      }

    };

  };

}
