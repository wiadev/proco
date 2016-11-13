var axios = require('axios');

const numberVerification = mobile_number => true;

module.exports = (uid, mobile_number, root) => {

  // @TODO: Verify the number here too.
  // @TODO: Handle brute forcing.

  return root.child(`/users/info/${uid}/mobile_number_verified`)
    .set(false)
    .then(() => {

      if (!numberVerification(mobile_number)) return root.child(`/users/info/${uid}/mobile_number`).set(null);

      const code = Math.floor(Math.random() * 900000) + 100000;
      const verRef = root.child(`/users/verifications/mobile_number/${uid}`); // verification ref
      return verRef.child('_code')
        .set(code)
        .then(() =>
          axios({
            method: 'post',
            url: 'https://api.bulutfon.com/messages',
            data: {
              receivers: mobile_number,
              title: 'BARBAR',
              content: `Use ${code} to verify your number.`,
              access_token: 'a110f6e2e5528ab87352ea4daa671cf41ab0cbb1eb32d4f96b1f42bc64ff8cae',
            },
          })
            .then(() => verRef.child('status').set('SENT_SMS'))
            .catch((e) => {
              console.log("There was an error with the mobile number verification", e);
              return verRef.child('status').set('FAILED_SMS');
            })
        );
    });

};
