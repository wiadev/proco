import {
  database,
  logEvent,
  getUserPath,
  getFirebaseDataWithCache,
  getNetworkTitle,
  timestamp,
  refs
} from "../../core/firebase";
import { assign } from "../../core/utils";
import { post } from "../Chat/actions";

export async function getProfile(uid) {
  const {
    display_name,
    age,
    avatar,
    gender,
    network
  } = await getFirebaseDataWithCache(getUserPath(uid, 'profile'));

  return {
    uid,
    name: display_name,
    age,
    avatar,
    gender,
    network: await getNetworkTitle(network),
  };
}

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

export const startTrackingOnlineStatus = (uid) => {
  return dispatch => {
    if (refs[`onlineStatusTrackerFor_${uid}`]) return;

    refs[`onlineStatusTrackerFor_${uid}`] = database.ref(`users/summary/${uid}/is_online`)
      .on('value', snap => dispatch(onlineStatusChanged(snap.val() || false)));

    dispatch(startedTrackingOnlineStatus());
  }
};

export const stopTrackingOnlineStatus = (uid) => {
  return dispatch => {
    const ref = refs[`onlineStatusTrackerFor_${uid}`];
    if (!ref) return;
    ref.off();
    delete refs[`onlineStatusTrackerFor_${uid}`];
    dispatch(stoppedTrackingOnlineStatus(uid));
  }
};

const startedTrackingOnlineStatus = (uid) => ({
  type: 'PROFILE_ONLINE_STATUS_STARTED_TRACKING',
  payload: {
    uid,
  },
});

const stoppedTrackingOnlineStatus = (uid) => ({
  type: 'PROFILE_ONLINE_STATUS_STOPPED_TRACKING',
  payload: {
    uid,
  },
});

const onlineStatusChanged = (uid, status = false) => ({
  type: 'PROFILE_ONLINE_STATUS_CHANGED',
  payload: {
    uid,
    status,
  },
});

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
