export const POOL_START_WATCHING = 'Proco/Pool/StartWatching';
export const POOL_STARTED_WATCHING = 'Proco/Pool/StartedWatching';
export const POOL_STATUS_CHANGED = 'Proco/Pool/StatusChanged';
export const POOL_SPOTTED = 'Proco/Pool/Spotted';
export const POOL_ADDED = 'Proco/Pool/Added';
export const POOL_REMOVED = 'Proco/Pool/Removed';
export const POOL_FOCUS = 'Proco/Pool/Focus';
export const POOL_UPDATED = 'Proco/Pool/Updated';
export const POOL_ACTION = 'Proco/Pool/Action';
export const POOL_ANSWER = 'Proco/Pool/Answer';
export const POOL_RESET = 'Proco/Pool/Reset';
export const POOL_VIEW = 'Proco/Pool/View';

export const spotted = (uid, added_on, is_close) => ({
  type: POOL_SPOTTED,
  payload: {
    uid, added_on, is_close,
  },
});

export const added = (uid, data) => ({
  type: POOL_ADDED,
  payload: {
    uid, ...data,
  },
});

export const removed = (uid, data) => ({
  type: POOL_REMOVED,
  payload: {
    uid, data,
  },
});

export const view = (uid, qid) => ({
  type: POOL_VIEW,
  payload: {
    uid, qid,
  },
});

export const answer = (qid, answer) => ({
  type: POOL_ANSWER,
  payload: {
    qid, answer,
  },
});

export const action = (uid, act, payload) => ({
  type: POOL_ACTION,
  payload: {
    uid, act, payload,
  },
});

export const focus = uid => ({
  type: POOL_FOCUS,
  payload: {
    uid,
  },
});

export const statusChanged = status => ({
  type: POOL_STATUS_CHANGED,
  payload: {
    status,
  },
});

export const updated = () => ({
  type: POOL_UPDATED,
});

export const reset = () => ({
  type: POOL_RESET,
});

export const startWatching = () => ({
  type: POOL_START_WATCHING,
});

export const startedWatching = () => ({
  type: POOL_STARTED_WATCHING,
});
