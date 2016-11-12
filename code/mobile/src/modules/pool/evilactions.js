import { database, timestamp, refs } from "../../core/firebase";
import { assign } from "../../core/utils";
import { block, report, match } from "../profiles/actions";
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

    if (reset) {
      dispatch(resetLocalPool());
    }

    database.ref(`ocean/statuses/${uid}`).set({
      status: reset ? 'IN_PROGRESS_RESET' : 'IN_PROGRESS',
      last_checked: timestamp,
    }).catch((e) => {
      console.log("Firebase Catched", e);
    });

  };
};

export const action = (uid, type = 'seen', payload = {}) => {
  return (dispatch, getState) => {

console.log(uid, type, payload)
    const poolData = getState().pool.items[uid];

console.log("poolData", poolData)
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
