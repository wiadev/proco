import { AsyncStorage, Image } from 'react-native';
import { database, storage } from '../../../core/Api';
import config from './config';

const getLoopsWithCache = (loop_key = 0) => {
  const key = `@Proco:FSC:LOOPS:${loop_key}`;
  return AsyncStorage.getItem(key).then(data => {
    if (data !== null) return JSON.parse(data);
    const loopBaseRef = storage.ref(`loops/${loop_key}`);
    let files = [];
    for (var i = 0; i < config.numberOfFrames; i++) {
      files.push(loopBaseRef.child(`${i}.jpg`).getDownloadURL());
    }
    return Promise.all(files).then(links => {
      links.forEach(link => Image.prefetch(link));
      AsyncStorage.setItem(key, JSON.stringify(links));
      return links;
    });
  });
};

export const getProfileLoop = async (uid = null, loop_key = null) => {
  if (!loop_key) {
    const snap = await database.ref(`users/summary/${uid}/loop_key`).once('value');
    loop_key = snap.val();
  }
  return await getLoopsWithCache(loop_key || 0);
};
