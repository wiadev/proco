export const PROFILE_LOAD_REQUEST = 'PROFILE_LOAD_REQUESTED';
export const PROFILE_LOADED = 'PROFILE_LOADED';

export const PROFILE_REPORT_REQUEST = 'proco/profiles/report';
export const PROFILE_BLOCK_REQUEST = 'proco/profiles/block';
export const PROFILE_MATCH_REQUEST = 'proco/profiles/match';
export const PROFILE_UNMATCH_REQUEST = 'proco/profiles/unmatch';

export const profileLoadRequest = uid => ({
  type: PROFILE_LOAD_REQUEST,
  payload: {uid}
});

export const profileLoaded = (uid, profile) => ({
  type: PROFILE_LOADED,
  payload: {uid, profile}
});

export const profileLoadFailed = (uid, error) => ({
  type: PROFILE_LOADED,
  payload: {uid, error}
});

export const report = (pid, payload) => ({
  type: PROFILE_REPORT_REQUEST,
  payload: {pid, ...payload}
});

export const block = (pid, payload) => ({
  type: PROFILE_BLOCK_REQUEST,
  payload: {pid, ...payload}
});

export const match = (pid, payload) => ({
  type: PROFILE_MATCH_REQUEST,
  payload: {pid, ...payload}
});
