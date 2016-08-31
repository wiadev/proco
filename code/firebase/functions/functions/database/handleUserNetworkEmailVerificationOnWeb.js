/*
 * This is what our web site triggers when user clicks on the verification link.
 * In order to have the same mechanism for both SMS & e-mail (maybe phone call or something else in the future?)
 * we have this thin layer, what it does is simply taking the same as our SMS verification screen.
 * We take the code and enter. The flow handles the rest.
 */

var functions = require('firebase-functions');

var jwt = require('jwt-simple');
var secret = require('../../config').jwtSecret;

module.exports = functions.database().path('/tasks/network-email-verification-web-keys/{key}').on('write', function(event) {

    const adminRef = event.data.adminRef;

    let decoded = jwt.decode(event.data.val(), secret);
    if (!decoded || !decoded.easyCheck) {
        decoded = {
            code: 'A_WRONG_CODE',
        };
    }
    return adminRef.root.child('/users/verifications/network_email/' + decoded.uid + '/code')
        .set(decoded.code)
        .then(() => adminRef.root.child('/tasks/network-email-verification-web-indexes/' + event.params.key)
                .set(null)
                .then(() => adminRef.set(null)));
});
