const functions = require('firebase-functions');
const generator = require('./generator');
const GeoFire = require('geofire');
const firebase = require('firebase');
const timestamp = firebase.database.ServerValue.TIMESTAMP;

const $ = {};

$.ocean = functions.database().path('/ocean/index/{uid}')
  .onWrite('write', (event) => {

    const locationData = event.data.child('l');

    if (!locationData) {
      return event.data.adminRef.root.child(`ocean/statuses/${event.params.uid}`).set({
        status: 'NO_LOCATION',
        last_checked: timestamp,
      });
    }

    const previousLocationData = event.data.previous.child('l');

    if (previousLocationData) {
      const distance = GeoFire.distance([locationData[0], locationData[1]], [previousLocationData[0], previousLocationData[1]]);
      if (distance < 0.5) {
        return Promise.resolve();
      }
    }

    return event.data.adminRef.root.child(`ocean/statuses/${event.params.uid}`).set({
      status: 'NEEDS_REFRESH',
      last_checked: timestamp,
    });

  });

$.poolStatus = functions.database().path('/ocean/statuses/{uid}')
  .on('write', (event) => {

    const current = event.data.val();

    if (current === null) return Promise.resolve();

    const previous = event.data.previous.val();

    if (current && !current.status.includes('IN_PROGRESS')) return Promise.resolve();

    if (previous && previous.status === current.status) return Promise.resolve();

    if (current.status === 'IN_PROGRESS_RESET') {
      return event.data.adminRef.root.child(`ocean/pools/${event.params.uid}`).set(null)
        .then(() => generator(event));
    }

    if (previous && !(Date.now() - previous.last_checked >= 30000)) return Promise.resolve();

    return generator(event);

  });


module.exports = $;