const functions = require('firebase-functions');
const moment = require('moment');

const GenerateSummary = require('./GenerateSummary');
const NetworkEmail = require('./NetworkEmail');
const MobileNumber = require('./MobileNumber');

const isAnyTrue = (arr) => arr.some(el => Boolean(el) == true);

module.exports = functions.database().path('/users/info/{uid}')
  .onWrite('write', (event) => {

    const {data, params: {uid}} = event;

    if (data.val() === null) return Promise.resolve(); // This only happens when the user is deleted, clean up functions takes care of other information.

    const {previous, adminRef : {root}} = data;

    let actions = [];

    const isChanged = field => (previous.child(field).val() !== data.child(field).val());

    if (isChanged('network_email')) {
      actions.push(NetworkEmail(uid, data.child('network_email').val(), previous.child('network_email'), root));
    }

    if (isChanged('mobile_number')) {
      actions.push(MobileNumber(uid, data.child('mobile_number').val(), root));
    }

    if (isAnyTrue([
        isChanged('network'),
        isChanged('birthday'),
        isChanged('gender'),
      ])) {

      const isOnboarded = !!(data.child('network_email').val() && data.child('birthday').val() && data.child('gender').val());

      actions.push(root.child(`/users/is/${uid}/onboarded`).set(isOnboarded));

    }

    if (isAnyTrue([
        isChanged('network'),
        isChanged('birthday'),
        isChanged('gender'),
        isChanged('first_name'),
        isChanged('last_name'),
        isChanged('avatar')
      ])) {

      actions.push(root.child(`/users/summary/${uid}`).set(GenerateSummary(data.val())));

    }

    return Promise.all(actions);

  });
