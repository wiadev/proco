import { firebaseAppROOT, database } from '../utils';

const internalRef = database.ref('internal');
const groupsRef = database.ref('internal/acl/groups');
const usersRef = database.ref('internal/acl/users');

export const createCustomToken = (uid, additionalClaims = {}) =>
  firebaseAppROOT.auth().createCustomToken(uid, additionalClaims);

export const isInGroup = (uid, group) => groupsRef
  .child(group).child(uid).once('value')
  .then(data => (data.val() ? true : false));

export const listGroupsFor = (uid) => usersRef
  .child(uid).once('value')
  .then(data => data.val())
  .then(data => (data ? Object.keys(data) : []));

export const resetAccess = (uid) => usersRef
  .child(uid).once('value')
  .then(data => {
    const groups = data.val();
    if (!groups) return true;
    let updates = {};
    Object.keys(groups).forEach(group => {
      updates[`${group}/${uid}`] = null;
    });
    return groupsRef.update(updates).then(() => usersRef.child(uid).set(null));
  });

export const listMembersFor = (group) => groupsRef
  .child(group).once('value')
  .then(data => (data ? Object.keys(data.val()) : []));

export const setGroupMembership = (uid, group, to) =>
  usersRef.child(uid).child(group).set(to).then(() =>
    groupsRef.child(group).child(uid).set(to)
  );
