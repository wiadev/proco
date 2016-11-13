import {
  database,
  logEvent,
  getUserRef,
  getUserPath,
  getFirebaseDataWithCache,
  getNetworkTitle,
  timestamp,
  refs,
} from "../../core/firebase";
import { post } from "../chat/actions";

export const getProfileFromState = (uid, state) => state.profiles[uid];

export const shouldGetProfile = (uid, state) => {
  let profile = getProfileFromState(uid, state);
  return (!profile || profile.last_checked > 5000);
};

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

export const report = (uid, pid, payload = null) => {
  let actions = [];

  actions.push(logEvent('reports', {
    reported_user: pid,
    report_payload: payload,
  }));

  const reportRef = database.ref(`reports/${pid}`);
  const counterRef = reportRef.child('counter');

  actions.push(reportRef.child(`reported_by/${uid}`).set(true).then(() => {
    return counterRef.transaction((count) => {
      if (count) {
        count++;
      }
      return count;
    }).then(() => {
      return counterRef.once('value').then(snap => snap.val()).then(count => {
        if (count < 5) return Promise.resolve();
        return database.ref(`users/info/${pid}/banned`).set(true).then(() => {
          return logEvent('autoban', {
            banned_user: pid,
            count,
          });
        });
      });
    });
  }));

  return Promise.all(actions);
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

export const changeBlockStatus = (uid, pid, status = true, payload = {}) => {

  status = (status ? true : null);

  let updates = {
    [`blocks/${uid}/${pid}`]: status,
    [`blocked_by/${pid}/${uid}`]: status,
  };

  return database.ref('users').update(updates).then(() => {
    return logEvent('blocks', {
      user: pid,
      block_payload: payload,
      status,
    });
  });

};

export const afterMatchTasks = (uid, uidToMatch) => {
  const thread = database.ref('threads/info').push();

  return thread.set({
    people: {
      [uidToMatch]: true,
      [uid]: true,
    },
    created_at: timestamp,
  }).then(() => thread.key)

};

export const changeMatchStatus = (uid, uidToMatch, status) =>
  database.ref('users/matches').update({
    [`${uid}/${uidToMatch}`]: status,
    [`${uidToMatch}/${uid}`]: status,
  }).then(() => {
    return logEvent('matches', {
      uidToMatch,
      status,
    });
  });
