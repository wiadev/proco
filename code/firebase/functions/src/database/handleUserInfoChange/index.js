const functions = require('firebase-functions');

const GenerateProfile = require('./GenerateProfile');
const NetworkEmail = require('./NetworkEmail');
const MobileNumber = require('./MobileNumber');

const isAnyTrue = (arr) => arr.some(el => Boolean(el) === true);

module.exports = functions.database().path('/users/info/{uid}')
  .onWrite(event => {

    const {data, params: {uid}} = event;

    if (data.val() === null) return Promise.resolve(); // This only happens when the user is deleted, clean up
                                                       // functions takes care of other information.

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

      const isOnboarded = !!(data.child('network_email').val() && data.child('network_email_verified').val() && data.child('birthday').val() && data.child('gender')
        .val());

      actions.push(root.child(`/users/info/${uid}/onboarded`).set(isOnboarded));

    }

    if (isAnyTrue([
        isChanged('network'),
        isChanged('birthday'),
        isChanged('gender'),
        isChanged('first_name'),
        isChanged('last_name'),
        isChanged('avatar'),
        isChanged('current_question'),
        isChanged('current_question_id'),
      ])) {

      actions.push(root.child(`/users/profile/${uid}`).set(GenerateProfile(data.val())));

    }

    return Promise.all(actions);

  });
