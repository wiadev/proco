var axios = require('axios');
var jwt = require('jwt-simple');
var qs = require('qs');
var validator = require('validator');

const getCleanNetworkDomain = (email) => email.split('@')[1].replace(/\./g, '-');

module.exports = (uid, network_email, previous_network_email, root) => {

  const getFID = root.child(`/users/info/${uid}/fid`).once('value').then(snap => snap.val());

  return getFID.then(fid => {
    if (fid === 0) return Promise.resolve(); // User is either a system user, admin or a doll.

    const isVerifiedRef = root.child(`/users/is/${uid}/network_email_verified`);

    // @TODO: Handle brute forcing.

    return isVerifiedRef.set(false).then(() => {

      const userInfoRef = root.child(`/users/info/${uid}`);

      const verRef = root.child(`/users/verifications/network_email/${uid}`); // verification ref

      /*
       Soo, there is something important to note here. We are doing the validation of the network
       *AFTER* we did everything. Because normally a user isn't able to add an invalid network from the app,
       only a user with malicious intentions can do it manually. We reset the wrong information which would send the
       user to the verifications screen in the app anyways. This makes the process faster for the regular flow.
       We delete their e-mail, which in return triggers the code below.
       */

      if (network_email === null) {
        // so the user deleted their network_email, somehow; the don't support this for now
        // we need to remove them from their network too

        return verRef.set(null).then(() =>
          userInfoRef.child('network')
            .set(null)
            .then(() =>
              root.child(`/settings/networks/email-map/${getCleanNetworkDomain(previous_network_email)}`)
                .once('value')
                .then(snap => snap.val())
                .then(network => root.child(`/users/network-map/${network}/${uid}`).set(null))
            )
        );

      }

      const networkEmailRef = userInfoRef.child('network_email');

      if (!validator.isEmail(network_email)) return networkEmailRef.set(null);

      const normalizedEmail = validator.normalizeEmail(network_email);

      if (network_email !== normalizedEmail) return networkEmailRef.set(normalizedEmail);

      const code = root.child('/code-generation').push().key; // Learn this trick. It generates a time-based sortable random key.
      return verRef.child('_code').set(code).then(() => {

        const token = jwt.encode({
          code,
          uid,
        }, 'PROCO');

        const link = `https://procoapp.com/a/verifications?token=${token}`;
        return axios.post('https://api:key-c31f9f2fec6c5f5d99e19868314c0323@api.mailgun.net/v3/icoz.co/messages',
          qs.stringify({
            from: 'Proco Verification <verifications@icoz.co>',
            to: network_email,
            subject: 'Verify your university - Proco',
            text: `Go to ${link} to verify your university e-mail.`,
            html: `Click <a href="${link}">here</a> to verify your university e-mail.`,
          }))
          .then(() => {
            return verRef.child('status').set('SENT_EMAIL').then(() => {
              return root.child(`/settings/networks/email-map/${getCleanNetworkDomain(network_email)}`)
                .once('value')
                .then(snap => snap.val())
                .then(network => {

                  if (!network) { // This is what we were talking about in the note at the beginning.
                    console.log("WARNING", "This user is malicious", uid);
                    return networkEmailRef.set(null);
                  }

                  return userInfoRef.child('network')
                    .set(network)
                    .then(() =>
                      root.child(`/users/network-map/${network}/${uid}`).set(true)
                    );

                });
            });
          })
          .catch(function (e) {
            console.log("There was an error with the network e-mail verification", e);
            return verRef.child('status').set('FAILED_EMAIL');
          })
      });
    });
    
  });
};
