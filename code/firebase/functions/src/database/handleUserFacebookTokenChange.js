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
      return adminInfoRoot
        .once('value')
        .then(snap => snap.val())
        .then(dataOnHand => {

          if (!dataOnHand || (!dataOnHand.birthday && birthday)) { // If we don't have it and Facebook has it
            updates.birthday = birthday;
          }

          return adminInfoRoot.update(updates)
            .then(() =>
              axios.get(`https://graph.facebook.com/v2.7/${updates.fid}/picture?type=large&redirect=0`)
                .then(data => data.data.data.url)
                .then(url => adminRoot.child(`/users/info/${uid}/avatar`).set(url))
            )
            .then(() => {
              if (dataOnHand) return Promise.resolve();
              const userSettings = adminRoot.child(`/users/settings/${uid}`);
              return userSettings
                .once('value')
                .then(snap => snap.val())
                .then(currentSettings => {
                  if(!currentSettings) currentSettings = {};

                  return userSettings
                    .set(Object.assign({
                      suspend_discovery: false,
                      notify_new_messages: true,
                      notify_announcements: false,
                    }, currentSettings))
                    .then(() => {
                      const userFilters = adminRoot.child(`/users/filters/${uid}`);
                      return userFilters
                        .once('value')
                        .then(snap => snap.val())
                        .then(currentFilters => {
                          if(!currentFilters) currentFilters = {};

                          return userFilters.set(Object.assign({
                            gender: 'both',
                            age_min: 18,
                            age_max: 45,
                            only_from_network: false,
                          }, currentFilters));
                        });
                    })
                });
            })
        });
    })
    .catch(e => {
      console.log("Error in tokens", data.val(), e);
      return data.ref.set(null);
    });

});
