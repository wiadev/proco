import axios from 'axios';
import { getUserRef } from '../../../common/src/References/User';
import { getDataFromRef } from '../../../common/src/Utils/Firebase';

const checker = (a, b) {
  return (!a || (a !== b));
}

const worker = (data, progress, resolve, reject) => {

  const userInfoRef = getUserRef(data.payload.uid, 'info');

  getDataFromRef(userInfoRef).then(user => {
    if (!user || !user.facebook_token) {
      reject();
      return;
    }

    axios.get('https://graph.facebook.com/v2.7/me', {
      params: {
        fields: ['id', 'name', 'birthday', 'gender', 'age_range', 'first_name', 'last_name'].join(','),
        access_token: user.facebook_token
      }
    }).then(response => {

      let updates = {};

      if (checker(user.fid, response.id)) updates.fid = response.id;
      if (checker(user.name, response.name)) updates.name = response.name;
      if (!user.gender && response.gender) updates.gender = reponse.gender;

      if (checker(user.age_range_on_facebook, response.age_range)) {
        updates.age_range_on_facebook = response.age_range;
      }

      if (checker(user.first_name, response.first_name)) {
        updates.first_name = response.first_name;
      }

      if (checker(user.last_name, response.last_name)) {
        updates.last_name = response.last_name;
      }


      if (!user.birthday && response.data.birthday) {
        const birthday = response.data.birthday.split('/');
        updates.birthday = `${birthday[1]}/${birthday[0]}/${birthday[2]}`;
        updates.birthyear = birthday[2];
      }

      userInfoRef.update(updates).then(() => {
        resolve();
      });

  }).catch(function (error) {
    reject(error);
  });



  });


};

const key = 'USER_SET_FACEBOOK_TOKEN';
module.exports = {
  worker,
  key
};