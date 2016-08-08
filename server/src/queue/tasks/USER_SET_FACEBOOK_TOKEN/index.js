const axios = require('axios');
const utils = require('../utils');
const onboardingFormStatus = require('../../reducers/users/onboardingFormStatus');

const worker = (data, progress, resolve, reject) => {

  if (!data.payload.facebookToken) {
    reject();
    return;
  }

  axios.get('https://graph.facebook.com/v2.7/me', {
    params: {
      fields: ['id', 'name', 'birthday', 'gender', 'age_range', 'first_name', 'last_name'].join(','),
      access_token: data.payload.facebookToken
    }
  }).then((response) => {

    let basicInfo = {
      uid: data.payload.uid,
      fid: response.data.id,
      name: response.data.name,
      gender: response.data.gender || null,
      age_range_on_facebook: response.data.age_range,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      facebook_token: data.payload.facebookToken,
      birthday: null,
      birthyear: null,
    };

    if(response.data.birthday) { // Check date here because Facebook can be an ass
      const birthday = response.data.birthday.split('/');
      basicInfo.birthday = `${birthday[1]}/${birthday[0]}/${birthday[2]}`;
      basicInfo.birthyear = birthday[2];
    }

    utils.getUserRef(data.payload.uid).child('info').update(basicInfo).then(() => {
      resolve();
    });

  }).catch(function (error) {
    reject(error);
  });

};

const key = 'USER_SET_FACEBOOK_TOKEN';
module.exports = {
  worker,
  key
};