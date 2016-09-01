var functions = require('firebase-functions');
const axios = require('axios');
const moment = require('moment');

module.exports = functions.database().path('/users/tokens/{uid}').on('write', (event) => {

    const data = event.data;

    if (data.previous.child('facebook').val() === data.child('facebook').val()) {
        return Promise.resolve();
    }

    if (!data.child('facebook').val()) {
        return Promise.resolve();
    }

    const uid = event.params.uid;
    const adminRoot = data.adminRef.root;

    // @TODO: Verify the number here too.
    // @TODO: Handle brute forcing.

    const fields = ['id', 'name', 'birthday', 'gender', 'age_range', 'first_name', 'last_name'].join(',');

    return axios({
        method: 'get',
        url: `https://graph.facebook.com/v2.7/me?access_token=${data.child('facebook').val()}&fields=${fields}`,
    })
        .then(data => data.data)
        .then((data) => {
            const {id, name, gender, age_range = {}, first_name, last_name} = data;
            let birthday = data.birthday;

            let updates = {
                fid: id,
                name,
                gender: gender || null,
                first_name,
                last_name,
                age_range_on_facebook_min: age_range.min || null,
                age_range_on_facebook_max: age_range.max || null,
            };

            if (birthday) {
                if (!(birthday.split('/').length === 3)) {
                    birthday = null;
                } else {
                    birthday = moment(birthday, 'MM/DD/YYYY').format('YYYY-MM-DD');
                }
            }

            const adminInfoRoot = adminRoot.child(`/users/info/${uid}`);
            return adminInfoRoot.once('value')
                .then(snap => snap.val())
                .then(dataOnHand => {

                    if (!dataOnHand || (!dataOnHand.birthday && birthday)) { // If we don't have it and Facebook has it
                        updates.birthday = birthday;
                    }

                    return adminInfoRoot.update(updates)
                        .then(() =>
                            axios.get(`https://graph.facebook.com/v2.7/${updates.fid}/picture?type=large&redirect=0`)
                                .then(data => data.data.data.url)
                                .then(url => adminRoot.child(`/users/photos/${uid}`).child('avatar').set(url))
                        );
                });
        })
        .catch(e => {
            console.log("Error in tokens", data.val(), e);
            return data.ref.set(null);
        });

});
