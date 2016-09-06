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

  let summary = {};

  if (network) summary.network = network;
  if (gender) summary.gender = gender;
  if (avatar) summary.avatar = avatar;

  if (birthday) {
    summary.age = moment().diff(moment(birthday, 'YYYY-MM-DD'), 'years');
  }

  if (first_name && last_name) {
    summary.display_name = `${first_name} ${last_name.charAt(0)}.`;
  }

  return summary;
};

