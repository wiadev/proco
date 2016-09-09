import {database, timestamp} from "../../core/Api";
import {assign} from "../../core/utils";
import {block, report, match} from "../Profiles/actions";
import {requestPermission} from "../Permissions/actions";
import {getPoolData} from "./api";

export const startWatchingPool = () => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();
    database.ref(`pools/${uid}`).limitToFirst(20).on('child_added', (snap) => {
      dispatch(addToPool(snap.key, snap.val()));
    });
  };
};

export const addToPool = (uid, data) => {
  return async (dispatch, getState) => {
    const {pool, api: {data: {userInfo: {current_question_id = null}}}} = getState();
    if (pool[uid]) return true; // add some cache checking & expire stuff
    dispatch({
      type: 'POOL_ADD',
      payload: assign({
        uid,
      }, data, await getPoolData(uid, current_question_id)),
    });
  };
};

export const action = (uid, type = 'seen', payload = {}) => {
  return (dispatch, getState) => {

    const poolData = getState().pool.items[uid];
    const {question: {qid}, receivedAnswer} = poolData;

    dispatch(removeFromPool(uid));

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

export const removeFromPool = (id) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

    dispatch({
      type: 'POOL_REMOVE',
      payload: {
        uid,
      },
    });

    database.ref(`pools/${uid}/${id}`).set(null);

  };
};

export const questionSeen = (qid) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();
    database.ref(`users/questions/${qid}/seen_by/${uid}`).set(true);
  };
};

export const answer = (qid, answer) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

    database.ref(`users/questions/${qid}/answers/${uid}`).set({
      answer,
      timestamp,
    });

  };
};
