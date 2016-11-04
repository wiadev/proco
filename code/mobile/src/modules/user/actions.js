export const USER_DATA_INITIALIZED = 'USER_DATA_INITIALIZED';
export const USER_DATA_RECEIVED = 'USER_DATA_RECEIVED';

export const userDataInitialized = () => ({
  type: USER_DATA_INITIALIZED,
});

export const userDataReceived = (type, key, value) => ({
  type: USER_DATA_RECEIVED,
  payload: {
    type, key, value,
  },
});
