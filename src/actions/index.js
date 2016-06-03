/* @flow */
/* global setTimeout */

import { REQUEST_DATA, RECEIVE_DATA } from './../core/actionList';

export const requestData = () => {
  return {
    type: REQUEST_DATA,
  };
};

export const receiveData = (data) => {
  return {
    type: RECEIVE_DATA,
    data,
  };
};

export const fetchData = () => {
  return (dispatch) => {
    dispatch(requestData());
    return setTimeout(() => {
      const data = { message: 'Hello' };
      dispatch(receiveData(data));
    }, 300);
  };
};
