export const userDataActions = {

  USER_DATA_INITIALIZED: 'USER_DATA_INITIALIZED',
  USER_DATA_RECEIVED: 'USER_DATA_RECEIVED',
  USER_ONBOARDED: 'USER_ONBOARDED',

  userDataInitialized: () => ({
    type: userDataActions.USER_DATA_INITIALIZED,
  }),

  userDataReceived: (type, key, value) => ({
    type: userDataActions.USER_DATA_RECEIVED,
    payload: {
      type, key, value
    },
  }),

  userOnboarded: status => ({
    type: userDataActions.USER_ONBOARDED,
    payload: {
      status,
    },
  }),

};
