import {AsyncStorage, Image} from "react-native";
import RNFetchBlob from "react-native-fetch-blob";
import {database, storage} from "../../../core/Api";
import config from "./config";

const fs = RNFetchBlob.fs;
const cachePoolDir = fs.dirs.DocumentDir + '/LoopCache';
const loopBaseRef = storage.ref('loops');

export const clearCachedLoops = () =>
  fs.unlink(cachePoolDir).catch(e => Promise.resolve());

export const clearLoop = (loop_key) =>
  fs.unlink(`${cachePoolDir}/${loop_key}`).catch(e => Promise.resolve());

export const getProfileLoop = (loop_key = 0) => {
  let files = [];
  for (var i = 0; i < config.numberOfFrames; i++) {
    const path = `${loop_key}/${i}.jpg`;
    const localPath = cachePoolDir + '/' + path;
    files.push(
      fs.exists(localPath)
        .then((data) => data ? localPath : Promise.reject())
        .catch(() => loopBaseRef.child(path).getDownloadURL()
          .then(url =>
            RNFetchBlob
              .config({
                path: localPath,
              })
              .fetch('GET', url)
          )
          .then(res => res.path())
        )
    );
  }
  return Promise.all(files);
};

export const getProfileLoopOf = async(uid) => {
  const snap = await database.ref(`users/summary/${uid}/loop_key`).once('value');
  const loop_key = snap.val() || 0;
  return {
    files: await getProfileLoop(),
    key: loop_key,
  };
};
