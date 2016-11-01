export const profileActions = {

  PROFILE_LOAD_REQUEST: 'PROFILE_LOAD_REQUESTED',
  PROFILE_LOADED: 'PROFILE_LOADED',

  profileLoadRequest: uid => ({
    type: profileActions.PROFILE_LOAD_REQUEST,
    payload: { uid }
  }),

  profileLoaded: (uid, profile) => ({
    type: profileActions.PROFILE_LOADED,
    payload: { uid, profile }
  }),

};
