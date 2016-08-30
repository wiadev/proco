var functions = require('firebase-functions');

module.exports = functions.database().path('/users/info/{uid}').on('write', function(event) {

    if (!event.data.changed('mobile_number')) return;

    // @TODO: Verify the number here too.

    var data = event.data;
    var uid = event.params.uid;
    var adminRoot = data.adminRef.root;

    return adminRoot.child('/users/is/mobile_number_verified').set(false).then(function () {
        var code = Math.floor(Math.random() * 900000) + 100000;
        var verRef = adminRoot.child('/users/verifications/mobile-number/' + uid); // verification ref
        return verRef.child('_code').set(code).then(function () {
            var mobile_number = data.child('mobile_number').val();
            return axios({
                method: 'post',
                url: 'https://api.bulutfon.com/messages',
                data: {
                    receivers: mobile_number,
                    title: 'BARBAR',
                    content: `Use ${code} to verify your number.`
                },
                query: {
                    access_token: 'fdfd82458426e29178c8861851bf12d6c1461ecafb4abada67c62eea4db211f2'
                }
            }).then(function (data) {
                console.log("Sent mobile text", data);
                return verRef.child('status').set('SENT_SMS');
            }).catch(function (e) {
                console.log("There was an error with the mobile number verification", e);
                return verRef.child('status').set('FAILED_SMS');
            })
        });
    });
    
});
