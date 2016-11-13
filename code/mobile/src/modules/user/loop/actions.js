import { AsyncStorage } from "react-native";
import { getKey } from "../../../core/firebase";
import { upload as firebaseUpload } from "../../../core/firebase/storage";
import { updateLoopKey } from "../actions";
export const USER_LOOP_CHANGED = 'proco/user/loop/CHANGED';
export const USER_LOOP_CAPTURED = 'proco/user/loop/CAPTURED';
export const USER_LOOP_STATUS_CHANGED = 'proco/user/loop/STATUS_CHANGED';
export const USER_LOOP_UPLOAD_PROGRESS_CHANGED = 'proco/user/loop/UPLOAD_PROGRESS_CHANGED';
export const USER_LOOP_CLEAN_CAPTURED = 'proco/user/loop/CAPTURED/CLEAN';

export const cancelled = completed = () => ({
  type: USER_LOOP_CLEAN_CAPTURED,
});

export const startedCapturing = () => ({
  type: USER_LOOP_STATUS_CHANGED,
  payload: {
    status: 'CAPTURING',
  },
});

export const doneCapturing = (file = null) => ({
  type: USER_LOOP_CAPTURED,
  payload: {
    file,
  },
});

export const upload = () => {
  return (dispatch, getState) => {
    const {userloop: {file = null}, auth: {uid}} = getState();

    if (!file) {
      dispatch(failed());
      return;
    }

    dispatch(startedUploading());

    dispatch(progressChanged(0));

    const loop_key = `${uid}/${getKey()}`;

    return firebaseUpload(file, `loops/${loop_key}`, 'image/jpg')
    /*.uploadProgress((written, total) => {
     dispatch(fileUploadProgressChanged(i, (written / total)));
     })*/
      .then(snapshot => {
        dispatch(progressChanged(100));
        dispatch(completed());
        dispatch(updateLoopKey(loop_key));
        return snapshot;
      })
      .catch(e => {
        console.log("UPLOAD ERROR", e);
        dispatch(failed());
      });

  };
};

const progressChanged = (progress) => ({
  type: USER_LOOP_UPLOAD_PROGRESS_CHANGED,
  payload: {
    progress,
  },
});

const startedUploading = () => ({
  type: USER_LOOP_STATUS_CHANGED,
  payload: {
    status: 'UPLOADING',
  },
});

const failed = () => ({
  type: USER_LOOP_STATUS_CHANGED,
  payload: {
    status: 'FAILED',
  },
});

