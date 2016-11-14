export const PROFILE_LOAD_REQUEST = 'Proco/Profiles/LoadRequested';
export const PROFILE_LOADED = 'Proco/Profiles/Loaded';
export const PROFILE_REPORT_REQUEST = 'Proco/Profiles/Report';
export const PROFILE_BLOCK_REQUEST = 'Proco/Profiles/Block';
export const PROFILE_MATCH_REQUEST = 'Proco/Profiles/Match';
export const PROFILE_UNMATCH_REQUEST = 'Poco/Profiles/Unmatch';

export const profileLoadRequest = uid => ({
  type: PROFILE_LOAD_REQUEST,
  payload: {uid}
});

export const profileLoaded = (uid, profile) => ({
  type: PROFILE_LOADED,
  payload: {uid, ...profile}
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
  payload: {
    pid, ...Object.assign({
      status: true,
    }, payload)
  },
});

export const match = (pid, payload) => ({
  type: PROFILE_MATCH_REQUEST,
  payload: {pid, ...payload}
});
