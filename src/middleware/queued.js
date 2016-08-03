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

export function queuedMiddleware(client) {

  return ({ dispatch }) => {

    return next => action => {
      const { payload, type } = action;

      if (payload && payload.queued) {

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

        const types = {
          REQUEST: `${type}_REQUEST`,
          SUCCESS: `${type}_SUCCESS`,
          FAILURE: `${type}_FAILURE`
        };

        /** ACTION_REQUEST */
        const actionRequest: any = {
          type: types.REQUEST
        };

        next(actionRequest);

        /** Creating an Action Promise */
        const actionPromise = payload.promise(client);

        /** Rest of this line behaves like Redux-Thunk */
        actionPromise.then(
          result => {
            if (result.status >= 200 && result.status < 400) {
              /** ACTION_SUCCESS */
              const actionSuccess: any = Object.assign({}, actionRequest, {
                type: types.SUCCESS,
                payload: {
                  data: result.res
                }
              });

              if (payload.onSuccess) {
                actionSuccess.payload.next = payload.onSuccess;
              }

              return dispatch(actionSuccess);
            } else {
              /** ACTION_FAILURE */
              const actionFailure: any = Object.assign({}, actionRequest, {
                type: types.FAILURE,
                error: {
                  status: result.status,
                  message: result.res
                }
              });

              if (payload.onFailure) {
                actionFailure.payload.next = payload.onFailure;
              }

              return dispatch(actionFailure);
            }
          }
        ).catch(error => {
          const actionFailure: any = Object.assign({}, actionRequest, {
            type: types.FAILURE,
            error: {
              status: 500,
              message: error
            }
          });

          if (payload.onFailure) {
            actionFailure.payload.next = payload.onFailure;
          }

          return dispatch(actionFailure);
        });

        return actionPromise;
      } else if (payload && payload.next) {
        next(action);
        return dispatch(payload.next);
      } else {
        return next(action);
      }

    };

  };

}
