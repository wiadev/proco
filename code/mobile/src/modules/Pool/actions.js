import { database, timestamp, refs } from "../../core/Api";
import { assign } from "../../core/utils";
import { block, report, match } from "../Profiles/actions";
import { requestPermission } from "../Permissions/actions";
import { getPoolData } from "./api";
import { clearLoop } from "../Profiles/Loops/api";

export const trigger = (reset = false) => {
  return (dispatch, getState) => {
    const {auth: {uid}, pool} = getState();

    if (pool.status.status.includes('IN_PROGRESS')) return;

    if (!(Date.now() - pool.status.last_checked >= 30000)) {
      setTimeout(() => {
        dispatch(trigger());
      }, 30000);
      return;
    }

    database.ref(`ocean/statuses/${uid}`).set({
      status: reset ? 'IN_PROGRESS_RESET' : 'IN_PROGRESS',
      last_checked: timestamp,
    }).catch((e) => {
      console.log("Firebase Catched", e);
    });

  };
};

export const startWatchingPoolStatus = () => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();
    refs.poolStatus = database.ref(`ocean/statuses/${uid}`);

    refs.poolStatus.on('value', (snap) => {
      const data = snap.val() ? snap.val() : {
        status: 'NULL',
        last_checked: 0,
      };

      dispatch(changePoolStatus(data));
    });
  };
};

export const startWatchingPool = () => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();
    refs.pool = database.ref(`ocean/pools/${uid}`).orderByChild('added_on').limitToLast(5);

    dispatch(changePoolWatchStatus('STARTED_WATCHING'));
    refs.pool.on('child_added', (snap) => {
      dispatch(addToPool(snap.key, snap.val()));
    });
  };
};

export const addToPool = (uid, data) => {
  return async(dispatch, getState) => {
    const {pool, api: {data: {userInfo: {current_question = null, current_question_id = null}}}} = getState();
    if (pool.items[uid]) return true; // add some cache checking & expire stuff
    if (pool.status == !'SHOWING') dispatch(changePoolStatus('SHOWING'));

    const poolData = await getPoolData(uid, {
      qid: current_question_id,
      question: current_question,
    });

    if (!poolData.question.qid && !poolData.receivedAnswer) return true;

    dispatch({
      type: 'POOL_ADD',
      payload: assign({
        uid,
      }, data, poolData, {
        profileLoopPhotos: poolData.profileLoopPhotos.files,
        profileLoopKey: poolData.profileLoopPhotos.key,
      }),
    });
  };
};

export const action = (uid, type = 'seen', payload = {}) => {
  return (dispatch, getState) => {

    const poolData = getState().pool.items[uid];

    const {question: {qid}, receivedAnswer, profileLoopKey} = poolData;

    dispatch(removeFromPool(uid, profileLoopKey));

    switch (type) {
      case 'report':
        dispatch(report(uid, assign({
          ref: 'pool',
          poolData,
        })));
        break;
      case 'block':
        dispatch(block(uid, {
          ref: 'pool',
        }));
        break;
      case 'match':
        dispatch(match(uid));
        dispatch(requestPermission('notifications'));
        break;
      case 'answer':
        dispatch(answer(qid, payload));
        dispatch(requestPermission('notifications'));
        break;
      default:
        break;
    }

    if (!receivedAnswer) { // We don't show the question when there is an answer
      dispatch(questionSeen(qid));
    }

  };
};

export const removeFromPool = (user_key, loop_key) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

    dispatch({
      type: 'POOL_REMOVE',
      payload: {
        uid: user_key,
      },
    });

    database.ref(`ocean/pools/${uid}/${user_key}`).set(null);
    if (loop_key && loop_key !== 0) clearLoop(loop_key);
  };
};

export const questionSeen = (qid) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();
    database.ref(`users/questions/${qid}/seen_by/${uid}`).set(true);
  };
};

export const answer = (qid, payload) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

    database.ref(`users/questions/${qid}/answers/${uid}`).set({
      answer: payload.answer,
      timestamp,
    });

  };
};

const changePoolStatus = status => ({
  type: 'POOL_STATUS_CHANGED',
  payload: {
    status,
  },
});

const changePoolWatchStatus = status => ({
  type: 'POOL_WATCH_STATUS_CHANGED',
  payload: {
    status,
  },
});
