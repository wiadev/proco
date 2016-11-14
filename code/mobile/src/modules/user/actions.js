export const USER_DATA_INITIALIZED = 'Proco/User/DataInitialized';
export const USER_DATA_RECEIVED = 'Proco/User/DataReceived';
export const USER_SETTING_SAVE_REQUESTED = 'Proco/User/Settings/SaveRequested';
export const USER_QUESTION_UPDATE_REQUEST = 'Proco/User/Question/UpdateRequest';

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

export const questionUpdateRequest = question => ({
  type: USER_QUESTION_UPDATE_REQUEST,
  payload: {
    question,
  },
});
