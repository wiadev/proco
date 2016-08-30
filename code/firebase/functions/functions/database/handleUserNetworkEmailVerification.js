var functions = require('firebase-functions');
var handleUserVerification = require('./common/handleUserVerification');

module.exports = functions.database().path('/users/verifications/network_email/{uid}')
    .on('write', handleUserVerification('network_email'));
