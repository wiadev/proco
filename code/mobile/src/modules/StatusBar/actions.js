import {
  SHOW,
  HIDE,
  SET_STYLE,
} from './actionTypes';

export const showStatusBar = () => {
  return {
    type: SHOW,
  }
};

export const hideStatusBar = () => {
  return {
    type: HIDE,
  }
};

export const setStatusBarStyle = (style) => {
  return {
    type: SET_STYLE,
    payload: {
      style
    }
  }
};
