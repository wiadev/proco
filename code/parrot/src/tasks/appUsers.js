import { database } from '../utils';

export const cleanAppUser = (uid) => {
  const getRef = (type) => database.ref(`/users/${type}/${uid}`);
  const refs = ['info', 'pools', 'settings', 'questions', 'loops', 'tokens', 'summary'];

  return getRef('info').child('network').once('value').then(snap => snap.val()).then(network =>
    getRef(`network-map/${network}`).set(null).then(() =>
      Promise.all(refs.map(ref => getRef(ref).set(null)))
    )
  );
};
