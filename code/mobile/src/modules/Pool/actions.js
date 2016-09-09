import {database, getPoolData} from '../../core/Api';
import {assign} from '../../core/utils';

export const startWatchingPool = () => {
  return (dispatch, getState) => {
    const { auth: { uid } } = getState();
    database.ref(`pools/${uid}`).limitToFirst(5).on('child_added', (snap) => {
      dispatch(addToPool(snap.key, snap.val()));
    });
  };
};


export const addToPool = (uid, data) => {
  return (dispatch, getState) => {
    const { pool } = getState();
    if (pool[uid]) return true; // add some cache checking & expire stuff

    getPoolData(key).then(poolData => {
      dispatch({
        type: 'POOL_ADD',
        payload: assign({
          uid,
        }, data, poolData),
      });
    });

  };
};

export const matchTo = (uid) => {
  return (dispatch, getState) => {
    console.log("MATCHED TO", uid);
  };
};

export const saw = (key) => {
  return (dispatch, getState) => {

  };
};
