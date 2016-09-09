import { AsyncStorage } from 'react-native';
import { database, storage } from '../../core/Api';

const getLoopsWithCache = (uid, loop_key = 0, count = 18) => {
  const key = `@Proco:FSC:PLP:${uid}:${loop_key}`;
  return AsyncStorage.getItem(key).then(data => {
    if (data !== null) return JSON.parse(data);
    if (loop_key === 0) uid = 0;
    const loopBaseRef = storage.ref(`users/loops/${uid}/${loop_key}`);
    let files = [];
    for (var i = 0; i < count; i++) {
      files.push(loopBaseRef.child(`${i}.jpg`).getDownloadURL());
    }
    return Promise.all(files).then(links => {
      links.forEach(link => Image.prefetch(link));
      AsyncStorage.setItem(key, JSON.stringify(links));
      return links;
    });
  });
};

export const getProfileLoop = async (uid, loop_key = null, count = 18) => {
    if (!loop_key) {
      const snap = await database.ref(`users/summary/${uid}/loop_key`).once('value');
      loop_key = snap.val();
    }
   return await getLoopsWithCache(uid, loop_key || 0, count);
};
