import FirebaseWrapper from '../../core/Api/FirebaseWrapper';

import {
  LOADED,
} from './actionTypes';


export const userFirebaseModel = new FirebaseWrapper({
  onChange: taskActions.updateTaskSuccess,
}, Task);


export function loadUser() {
  return (dispatch, getState) => {
    const { auth } = getState();
    taskList.path = `tasks/${auth.id}`;
    taskList.subscribe(dispatch);
  };
}
