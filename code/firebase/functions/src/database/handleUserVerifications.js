const functions = require('firebase-functions');

module.exports = functions.database().path('/users/verifications/{verification_type}/{uid}')
  .onWrite((
    {
      params: {verification_type, uid},
      data,
    }
  ) => {

    const {adminRef} = data;

    if (!data.child('code').val() || (data.previous.child('code').val() === data.child('code').val())) {
      return Promise.resolve();
    }

    // @TODO: Handle brute forcing.

    if (data.child('code').val() === data.child('_code').val()) {
      return adminRef.root.child(`/users/info/${uid}/${verification_type}_verified`)
        .set(true)
        .then(() => adminRef.set(null));
    } else {
      return adminRef.update({
        code: null,
        status: 'WRONG_CODE',
      });
    }

  });
