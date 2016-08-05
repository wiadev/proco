import {
  SHOW_IN_APP_ALERT,
  CLEAR_IN_APP_ALERT
} from './actionTypes';

export const showInAppAlert = (data) => {
  return {
    type: SHOW_IN_APP_ALERT,
    payload: {
      ...data
    }
  };
};

export const clearInAppAlert = () => {
  return (dispatch, getState) => {
    if(getState().inAppAlert.get('show')) {
      dispatch({
        type: CLEAR_IN_APP_ALERT,
      });
    }
  };
};
