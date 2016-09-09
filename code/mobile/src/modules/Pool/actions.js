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


export const addToPool = (key, data) => {
  return (dispatch, getState) => {
    const { pool } = getState();
    if (pool[key]) return true; // add some cache checking & expire stuff

    getPoolData(key).then(poolData => {
      dispatch({
        type: 'POOL_ADD',
        payload: assign({
          key,
        }, data, poolData),
      });
    });

  };
};

export const matchTo = (key) => {
  return (dispatch, getState) => {
    console.log("MATCHED TO", key);
  };
};

export const saw = (key) => {
  return (dispatch, getState) => {

  };
};
