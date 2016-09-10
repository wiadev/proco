import {AsyncStorage} from "react-native";
import {getKey} from "../../../core/Api";
import {upload as firebaseUpload} from "../../../core/Api/firebase/storage";
import {updateLoopKey} from "../actions";
import {
  USER_LOOP_CAPTURED,
  USER_LOOP_STATUS_CHANGED,
  USER_LOOP_UPLOAD_PROGRESS_CHANGED,
  USER_LOOP_UPLOAD_PROGRESSES_CHANGED,
  USER_LOOP_CLEAN_CAPTURED,
} from "./constants";

export const cancelled = completed = () => ({
  type: USER_LOOP_CLEAN_CAPTURED,
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
    const {userloop: {photos = []}} = getState();

    dispatch(startedUploading());

    dispatch(uploadProgressChanged(0));

    const loop_key = getKey();

    const uploads = photos.map((photo, i) =>
      firebaseUpload(photo, `loops/${loop_key}/${i}.jpg`, 'image/jpg')
        /*.uploadProgress((written, total) => {
          dispatch(fileUploadProgressChanged(i, (written / total)));
        })*/
        .then(snapshot => {
          dispatch(fileUploadProgressChanged(i, 1));
          return snapshot;
        })
    );

    Promise.all(uploads).then(() => {
      dispatch(completed());
      dispatch(updateLoopKey(loop_key));
    }).catch(e => {
      console.log("UPLOAD ERROR", e);
      dispatch(failed());
    })

  };
};

const fileUploadProgressChanged = (file, progress) => {
  return (dispatch, getState) => {
    const {userloop: {progresses}} = getState();
    progresses[file] = progress;
    dispatch({
      type: USER_LOOP_UPLOAD_PROGRESSES_CHANGED,
      payload: {
        progresses,
      },
    });
    dispatch(uploadProgressChanged());
  }
};

const uploadProgressChanged = () => {
  return (dispatch, getState) => {
    const {userloop: {progresses = []}} = getState();
    dispatch({
      type: USER_LOOP_UPLOAD_PROGRESS_CHANGED,
      payload: {
        progress: (progresses.reduce((a, b) => a + b, 0) / progresses.length) * 100,
      },
    });
  };
};

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

