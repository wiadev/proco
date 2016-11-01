const functions = require('firebase-functions');
const moment = require('moment');

module.exports = (data = {}) => {
  const {
    network = null,
    gender = null,
    birthday = null,
    first_name = null,
    last_name = null,
    avatar = null,
  } = data;

  let profile = {};

  if (network) profile.network = network;
  if (gender) profile.gender = gender;
  if (avatar) profile.avatar = avatar;

  if (birthday) {
    profile.age = moment().diff(moment(birthday, 'YYYY-MM-DD'), 'years');
  }

  if (first_name && last_name) {
    profile.display_name = `${first_name} ${last_name.charAt(0)}.`;
  }

  return profile;
};

