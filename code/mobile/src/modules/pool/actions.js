
export const POOL_START_WATCHING = 'proco/pool/startWatching';
export const POOL_STARTED_WATCHING = 'proco/pool/startedWatching';
export const POOL_STATUS_CHANGED = 'proco/pool/status_changed';
export const POOL_SPOTTED = 'proco/pool/spotted';
export const POOL_ADDED = 'proco/pool/added';
export const POOL_REMOVED = 'proco/pool/removed';
export const POOL_FOCUS = 'proco/pool/focus';
export const POOL_UPDATED = 'proco/pool/updated';
export const POOL_ACTION = 'proco/pool/action';
export const POOL_ANSWER = 'proco/pool/answer';
export const POOL_RESET = 'proco/pool/reset';
export const POOL_VIEW = 'proco/pool/view';

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
