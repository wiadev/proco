export const userDataActions = {

  USER_DATA_INITIALIZED: 'USER_DATA_INITIALIZED',
  USER_DATA_RECEIVED: 'USER_DATA_RECEIVED',

  userDataInitialized: () => ({
    type: userDataActions.USER_DATA_INITIALIZED,
  }),

  userDataReceived: (key, value) => ({
    type: userDataActions.USER_DATA_RECEIVED,
    payload: {
      key, value
    },
  }),

};
