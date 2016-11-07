export const PROFILE_LOAD_REQUEST = 'PROFILE_LOAD_REQUESTED';
export const PROFILE_LOADED = 'PROFILE_LOADED';

export const PROFILE_REPORT_REQUEST = 'proco/profiles/report';
export const PROFILE_BLOCK_REQUEST = 'proco/profiles/block';
export const PROFILE_CHANGE_MATCH_STATUS = 'proco/profiles/match';

export const profileLoadRequest = uid => ({
  type: PROFILE_LOAD_REQUEST,
  payload: {uid}
});

export const profileLoaded = (uid, profile) => ({
  type: PROFILE_LOADED,
  payload: {uid, profile}
});
