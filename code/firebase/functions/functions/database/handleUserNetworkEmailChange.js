var functions = require('firebase-functions');
var axios = require('axios');
var jwt = require('jwt-simple');
var qs = require('qs');
var validator = require('validator');

var secret = require('../../config').jwtSecret;

const getCleanNetworkDomain = (email) => email.split('@')[1].replace(/\./g, '-');

module.exports = functions.database().path('/users/info/{uid}').on('write', function (event) {

    var data = event.data;

    const network_email = data.child('network_email').val();

    if (data.previous.child('network_email').val() === network_email) {
        return Promise.resolve();
    }

    const uid = event.params.uid;
    const adminRoot = data.adminRef.root;

    const isVerifiedRef = adminRoot.child('/users/is/' + uid + '/network_email_verified');

    // @TODO: Handle brute forcing.

    return isVerifiedRef.set(false).then(function () {

        const networkEmailRef = data.ref.child('network_email');

        const verRef = adminRoot.child('/users/verifications/network_email/' + uid); // verification ref

        /*
         Soo, there is something important to note here. We are doing the validation of the network
         *AFTER* we did everything. Because normally a user isn't able to add an invalid network from the app,
         only a user with malicious intentions can do it manually. We reset the wrong information which would send the
         user to the verifications screen in the app anyways. This makes the process faster for the regular flow.
         We delete their e-mail, which in return triggers the code below.
         */

        if (!network_email) {
            // so the user deleted their network_email, somehow; the don't support this for now
            // we need to remove them from their network too
            const previous_network_email = data.previous.child('network_email').val();

            if (!previous_network_email || !validator.isEmail(previous_network_email)) {
                return Promise.resolve();
            }

            return verRef.set(null).then(() =>
                data.event.ref.child('network')
                    .set(null)
                    .then(() =>
                        adminRoot.child(`/settings/networks/email-map/${getCleanNetworkDomain(previous_network_email)}`)
                            .once('value')
                            .then(snap => snap.val())
                            .then(network =>
                                adminRoot.child(`/users/network-map/${network}/${uid}`)
                                    .set(null)
                            )
                    )
            );

        }

        if (!validator.isEmail(network_email)) return networkEmailRef.set(null);

        const normalizedEmail = validator.normalizeEmail(network_email);

        if (!(network_email === normalizedEmail)) return networkEmailRef.set(normalizedEmail);

        var code = adminRoot.child('/code-generation').push().key; // Learn this trick. It generates a time-based sortable random key.
        return verRef.child('_code').set(code).then(function () {

            const token = jwt.encode({
                code: code,
                uid: uid,
                easyCheck: true,
            }, secret);

            const indexRef = adminRoot.child('/tasks/network-email-verification-web-indexes').push();

            return indexRef.set(token).then(() => {
                var link = 'https://procoapp.com/a/verifications?key=' + indexRef.key;
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
                            return adminRoot.child(`/settings/networks/email-map/${getCleanNetworkDomain(network_email)}`)
                                .once('value')
                                .then(snap => snap.val())
                                .then(network => {
                                    const userInfoRef = adminRoot.child('/users/info/' + uid);

                                    if (!network) { // This is what we were talking about in the note at the beginning.
                                        console.log("WARNING", "This user is malicious", uid);
                                        return userInfoRef.child('network_email').set(null);
                                    }

                                    return userInfoRef.child('network').set(network)
                                        .then(() => adminRoot.child('/users/network-map/' + network + '/' + uid).set(true));

                                });
                        });
                    }).catch(function (e) {
                        console.log("There was an error with the network e-mail verification", e);
                        return verRef.child('status').set('FAILED_EMAIL');
                    })
            });
        });
    });

});
