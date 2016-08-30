/*
 * This is what our web site triggers when user clicks on the verification link.
 * In order to have the same mechanism for both SMS & e-mail (maybe phone call or something else in the future?)
 * we have this thin layer, what it does is simply taking the same as our SMS verification screen.
 * We take the code and enter. The flow handles the rest.
 */

var functions = require('firebase-functions');

var jwt = require('jwt-simple');
var token = require('../config').jwtSecret;

module.exports = functions.database().path('/tasks/network-email-verification-web/{id}').on('write', function(event) {

    console.log("THIS WAS TRIGGERED", );

    var decoded = jwt.decode(token, secret);
    if (!decoded.easyCheck) {
        return event.data.adminRef.set(null).then(() => {
            return Promise.reject('WRONG_TOKEN');
        });
    }
    console.log(decoded); //=> { foo: 'bar' }

    return Promise.resolve();
});
