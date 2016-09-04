import axios from 'axios';
import { FACEBOOK_API_CONFIG } from './config';
import { testUsersRef } from './api';
import faker from 'faker';

const getFakeHuman = () => {
    return { name: faker.name.findName(), };
};

const fb = axios.create({
  baseURL: 'https://graph.facebook.com/v2.7/',
  params: {'access_token': FACEBOOK_API_CONFIG.appAccessToken}
});

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
  permissions: ['public_profile', 'user_likes', 'user_friends', 'user_birthday'],
  name: faker.name.findName()
}, addToFirebase = true) =>  fb.post(`${FACEBOOK_API_CONFIG.appID}/accounts/test-users`, fields)
.then(data => data.data)
.then(data => {
  if (!addToFirebase) return data;
  return testUsersRef(data.id).set(data);
})

export const deleteFacebookTestUser = (fid) => fb.delete(fid)
.then(() => testUsersRef.child(fidid).set(null));


export const syncFacebookTestUsers = () => getAllFacebookTestUsers()
  .then(users =>
    Promise.all(users.map(user => testUsersRef(user.id).update(user))).then(() => true)
  );

export const getFacebookTestUserProfile = (fid) => fb.get(fid, {
  params: {
    fields: ['id', 'name', 'birthday', 'gender', 'age_range', 'first_name', 'last_name', 'email'].join(',')
  }
}).then(data => data.data);


export default fb;
