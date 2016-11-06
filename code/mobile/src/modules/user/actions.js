export const USER_DATA_INITIALIZED = 'USER_DATA_INITIALIZED';
export const USER_DATA_RECEIVED = 'USER_DATA_RECEIVED';
export const USER_SETTINGS_SAVE_REQUESTED = 'USER_SETTINGS_SAVE_REQUESTED';

export const userDataInitialized = () => ({
  type: USER_DATA_INITIALIZED,
});

export const userDataReceived = (type, key, value) => ({
  type: USER_DATA_RECEIVED,
  payload: {
    type, key, value,
  },
});

export const userSaveSettings = settings => ({
  type: USER_SETTINGS_SAVE_REQUESTED,
  payload: {
    ...settings,
  },
});
