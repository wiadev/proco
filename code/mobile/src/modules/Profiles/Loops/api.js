import RNFetchBlob from "react-native-fetch-blob";
import {database, storage} from "../../../core/Api";

const fs = RNFetchBlob.fs;
const cachePoolDir = fs.dirs.DocumentDir + '/LoopCache';
const loopBaseRef = storage.ref('loops');

export const clearCachedLoops = () => Promise.resolve();
export const clearLoop = (loop_key) => Promise.resolve();

/*export const clearCachedLoops = () =>
  fs.unlink(cachePoolDir).catch(e => Promise.resolve());

export const clearLoop = (loop_key) =>
  fs.unlink(`${cachePoolDir}/${loop_key}`).catch(e => Promise.resolve());
*/

export const getProfileLoop = (loop_key = 0) => {
  const localPath = cachePoolDir + '/' + loop_key;
  return fs.exists(localPath)
    .then((data) => data ? localPath : Promise.reject())
    .catch(() => loopBaseRef.child(loop_key).getDownloadURL()
      .then(url =>
        RNFetchBlob
          .config({
            path: localPath,
          })
          .fetch('GET', url)
      )
      .then(res => res.path())
    );
};

export const getProfileLoopOf = async(uid) => {
  const snap = await database.ref(`users/summary/${uid}/loop_key`).once('value');
  const loop_key = snap.val() || '0';
  return {
    file: await getProfileLoop(loop_key),
    key: loop_key,
  };
};
