import {AsyncStorage} from "react-native";
import {database, base} from "../../../core/Api";
import {
  USER_LOOP_CAPTURED,
  USER_LOOP_STATUS_CHANGED,
  USER_LOOP_UPLOAD_PROGRESS_CHANGED
} from './constants';

export const cancelled = completed = () => ({
  type: USER_LOOP_STATUS_CHANGED,
  payload: {
    status: 'WAITING',
  },
});

export const startedCapturing = () => ({
  type: USER_LOOP_STATUS_CHANGED,
  payload: {
    status: 'CAPTURING',
  },
});

export const doneCapturing = (photos = []) => ({
  type: USER_LOOP_CAPTURED,
  payload: {
    photos,
  },
});

export const upload = () => {
  return (dispatch, getState) => {
    const { auth: { uid }, userLoop: { photos  = [] } } = getState();

    dispatch(startedUploading());

    dispatch(uploadProgressChanged(0));




    dispatch(completed());


  };
};

const startedUploading = () => ({
  type: USER_LOOP_STATUS_CHANGED,
  payload: {
    status: 'UPLOADING',
  },
});

const uploadProgressChanged = (progress = 0) => ({
  type: USER_LOOP_UPLOAD_PROGRESS_CHANGED,
  payload: {
    progress,
  },
});
