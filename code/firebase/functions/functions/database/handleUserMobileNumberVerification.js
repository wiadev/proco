var functions = require('firebase-functions');
var handleUserVerification = require('./common/handleUserVerification');

module.exports = functions.database().path('/users/verifications/mobile_number/{uid}')
    .on('write', handleUserVerification('mobile_number'));
