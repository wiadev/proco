import { database, fb, FACEBOOK_API_CONFIG, asArray } from '../../utils';
import { cleanAppUser } from '../appUsers';

const testUsersRef = (fid) => database.ref(`internal/playhouse/test-users/${fid ? fid : ''}`);

import faker from 'faker';

const getFakeHuman = () => {
    return { name: faker.name.findName(), };
};


export const getAllFacebookTestUsers = (previous = {data: [], next: null}) =>
  fb.get(previous.next ? previous.next : `${FACEBOOK_API_CONFIG.appID}/accounts/test-users`)
    .then(data => data.data)
    .then(data => {
      let users = previous.data.concat(data.data);
      if (data.paging && data.paging.next) {
        return getAllFacebookTestUsers({data: users, next: data.paging.next});
      }
      return users;
    });

export const createFacebookTestUser = (fields = {
  installed: true,
  permissions: ['public_profile', 'user_likes', 'user_friends', 'user_birthday'].join(','),
  name: faker.name.findName()
}, addToFirebase = true) =>  fb.post(`${FACEBOOK_API_CONFIG.appID}/accounts/test-users`, fields)
.then(data => data.data)
.then(data => {
  if (!addToFirebase) return data;
  return testUsersRef(data.id).set(data);
})

export const deleteFacebookTestUser = (fid) => fb.delete(fid)
  .then(() => testUsersRef.child(fidid).set(null));

export const getAccessTokenFor = (fid) => testUsersRef(fid).child('access_token')
  .once('value').then(snap => snap.val())
  .then(data => {
    syncFacebookTestUserList();  // Tokens expire as soon as they are used. We'll refresh after using one.
    return data;
  });

export const syncFacebookTestUserList = () => getAllFacebookTestUsers()
  .then(users =>
    Promise.all(users.map(user => testUsersRef(user.id).update(user))).then(() => users.length)
  );

export const cleanFacebookTestUsersFromApp = () => getAllFacebookTestUsers()
  .then(users =>
    Promise.all(users.map(user => cleanAppUser(`doll${user.id}`))).then(() => users.length)
  );


export const syncFacebookTestUsersWithApp = () => getAllFacebookTestUsers()
  .then(users =>
    Promise.all(users.map(user =>
      database.ref(`users/tokens/doll${user.id}/facebook`).set(user.access_token).then(() =>
        database.ref(`users/info/doll${user.id}/email`).set(`${user.id}@dolls.procoapp.com`).then(() =>
          database.ref(`users/is/doll${user.id}/network_email_verified`).set(true)
        )
      )
    )).then(() => users.length)
  );

export const syncFacebookTestUserProfiles = () => testUsersRef()
  .once('value')
  .then(snap => snap.val())
  .then(data => data ? asArray(data) : [])
  .then(users =>
    Promise.all(users.map(user =>
      getFacebookTestUserProfile(user.id).then(fbuser =>
        testUsersRef(user.id).update(fbuser)
      )
    )).then(() => users.length)
  );

  export const syncFacebookTestUserPasswords = (password = 'bar123bar.') => testUsersRef()
    .once('value')
    .then(snap => snap.val())
    .then(data => data ? asArray(data) : [])
    .then(users =>
      Promise.all(users.map(user =>
        setFacebookTestUserProfile(user.id, {
          password
        })
      )).then(() => users.length)
    );

export const getFacebookTestUserProfile = (fid) => fb.get(fid, {
  params: {
    fields: ['id', 'name', 'birthday', 'gender', 'age_range', 'first_name', 'last_name', 'email'].join(',')
  }
}).then(data => data.data);

export const setFacebookTestUserProfile = (fid, data = {}) => fb.post(fid, data).then(data => true);

export default fb;
