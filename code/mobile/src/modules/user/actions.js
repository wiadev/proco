export const USER_DATA_INITIALIZED = 'USER_DATA_INITIALIZED';
export const USER_DATA_RECEIVED = 'USER_DATA_RECEIVED';
export const USER_SETTING_SAVE_REQUESTED = 'USER_SETTING_SAVE_REQUESTED';

export const userDataInitialized = () => ({
  type: USER_DATA_INITIALIZED,
});

export const userDataReceived = (type, key, value) => ({
  type: USER_DATA_RECEIVED,
  payload: {
    type, key, value,
  },
});

export const userSaveSetting = (key, value) => ({
  type: USER_SETTING_SAVE_REQUESTED,
  payload: {
    key, value,
  },
});
