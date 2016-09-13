import {database, timestamp, refs} from "../../core/Api";
import {assign} from "../../core/utils";
import {block, report, match} from "../Profiles/actions";
import {requestPermission} from "../Permissions/actions";
import {getPoolData} from "./api";
import { clearLoop } from '../Profiles/Loops/api';

export const startWatchingPool = () => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();
    refs.pool = database.ref(`pools/${uid}`).limitToFirst(20);

    dispatch(changePoolStatus('STARTED_WATCHING'));
    refs.pool.on('child_added', (snap) => {
      dispatch(addToPool(snap.key, snap.val()));
    });
  };
};

export const addToPool = (uid, data) => {
  return async(dispatch, getState) => {
    const {pool, api: {data: {userInfo: {current_question_id = null}}}} = getState();
    if (pool.items[uid]) return true; // add some cache checking & expire stuff
    if (pool.status ==! 'SHOWING') dispatch(changePoolStatus('SHOWING'));
    const poolData = await getPoolData(uid, current_question_id);
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

    database.ref(`pools/${uid}/${user_key}`).set(null);
    if (loop_key) clearLoop(loop_key);
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
