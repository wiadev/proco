import { database, logEvent, getFirebaseDataWithCache, getFirebaseData, timestamp } from "../../core/Api";
import { assign } from "../../core/utils";
import { getProfileLoop } from "./Loops/api";
import { post } from "../Chat/actions";

export const loadSummary = (uid) => {
  return async(dispatch) => {
    dispatch({
      type: 'PROFILE_LOADED',
      payload: await getFirebaseData(`users/summary/${uid}`),
    });
  };
};

export const loadLoops = (uid, loop_key = null, count = 18) => {
  return async(dispatch) => {
    dispatch({
      type: 'LOOPS_LOADED',
      payload: {
        uid,
        loops: await getProfileLoop(uid, loop_key, count),
      },
    });
  };
};

export const report = (id, payload) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

    dispatch(block(id, assign({
      triggered_by: 'report',
    }, payload)));

    logEvent('reports', {
      reported_user: id,
      report_payload: payload,
    });

    const reportRef = database.ref(`reports/${id}`);
    const counterRef = reportRef.child('counter');

    reportRef.child(`reported_by/${uid}`).set(true).then(() => {
      return counterRef.transaction((count) => {
        if (count) {
          count++;
        }
        return count;
      }).then(() => {
        return counterRef.once('value').then(snap => snap.val()).then(count => {
          if (count < 5) return Promise.resolve();
          return database.ref(`users/is/${id}/banned`).set(true).then(() => {
            return logEvent('autoban', {
              banned_user: id,
              count,
            });
          });
        });
      });
    });
  };
};

export const block = (id, payload = {}) => {
  return (dispatch) => {
    dispatch(changeBlockStatus(id, true, payload));
  };
};

export const unblock = (id, payload = {}) => {
  return (dispatch) => {
    dispatch(changeBlockStatus(id, false, payload));
  };
};

const changeBlockStatus = (id, status = true, payload = {}) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();
    database.ref(`users/blocks/${uid}/${id}`).set(status).then(() => {
      return logEvent('blocks', {
        user: id,
        block_payload: payload,
        status,
      });
    });
  };
};

export const match = (uidToMatch) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

    dispatch(changeMatchStatus(uidToMatch, true));

    const thread = database.ref('threads/info').push();

    thread.set({
      people: {
        [uidToMatch]: true,
        [uid]: true,
      },
      created_at: timestamp,
    }).then(() => {

      dispatch(post(thread.key, {
        _id: 0,
        text: `Congrats, it's a match!`,
        createdAt: timestamp,
        user: 'proco',
        type: 'matched-banner',
      }));
    });

  };
};

export const unmatch = (mid) => {
  return (dispatch, getState) => {
    dispatch(changeMatchStatus(mid, false));
  };
};


const changeMatchStatus = (uidToMatch, status) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();
    const matchUpdates = {
      [`${uid}/${uidToMatch}`]: status,
      [`${uidToMatch}/${uid}`]: status,
    };
    database.ref('users/matches').update(matchUpdates).then(() => {
      return logEvent('matches', {
        uidToMatch,
        status,
      });
    });
  };
};
