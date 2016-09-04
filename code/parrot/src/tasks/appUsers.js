import { firebaseApp, database } from '../utils';

export const cleanAppUser = (uid) => {
  const getRef = (type) => database.ref(`/users/${type}/${uid}`);
  const refs = ['info', 'settings', 'questions', 'loops', 'filters', 'tokens', 'summary', 'is'];
  Promise.all(refs.map(ref => getRef(ref).set(null)));
};
