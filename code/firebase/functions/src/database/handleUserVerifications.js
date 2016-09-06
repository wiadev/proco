const functions = require('firebase-functions');

module.exports = functions.database().path('/users/verifications/{verification_type}/{uid}')
  .on('write', ({
    params: {verification_type, uid},
    data,
  }) => {

    const {adminRef} = data;

    if (!data.child('code').val() || (data.previous.child('code').val() === data.child('code').val())) {
      return Promise.resolve();
    }

    // @TODO: Handle brute forcing.

    if (data.child('code').val() === data.child('_code').val()) {
      return adminRef.root.child(`/users/is/${uid}/${verification_type}_verified`)
        .set(true)
        .then(() => adminRef.set(null));
    } else {
      return adminRef.root.update({
        code: null,
        status: 'WRONG_CODE',
      });
    }

  });
