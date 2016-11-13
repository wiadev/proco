const firebase = require('firebase');
const GeoFire = require('geofire');
const timestamp = firebase.database.ServerValue.TIMESTAMP;

module.exports = (event) => {
  const uid = event.params.uid;

  const oceanAdmin = event.data.adminRef.root.child(`ocean`);
  const status = oceanAdmin.child(`statuses/${uid}`);
  const index = oceanAdmin.child(`index`);
  const pool = event.data.ref.parent.parent.child(`pools/${uid}`);
  const locationData = event.data.val().location;

  if (!locationData) {
    return status.update({
      status: 'NO_LOCATION',
      last_checked: timestamp,
    });
  }

  const location = [locationData[0], locationData[1]];
  const geoFire = new GeoFire(index);

  return new Promise((resolve, reject) => {
    const geoQuery = geoFire.query({
      center: location,
      radius: 500,
    });

    let drops = [];

    geoQuery.on("ready", () => {

      if (drops.length > 0) {
        status.update({
          status: 'COMPLETED',
          last_checked: timestamp,
        });
      }

      const radius = geoQuery.radius();
      if (drops.length < 10 && radius < 5) { // If we have less than 10 drops and radius is less than 5 km, up the radius
        geoQuery.updateCriteria({
          radius: radius + 1,
        });
      } else {

        geoQuery.cancel();

        Promise.all(drops)
          .then(() => {
            status.update({
              status: 'COMPLETED',
              last_checked: timestamp,
            })
              .then(() => resolve());
          })
          .catch(e => {
            console.log("Catched something", e);
            status.update({
              status: 'FAILED',
              last_checked: timestamp,
            })
              .then(() => reject(e));
          });

      }
    });

    geoQuery.on("key_entered", (key, location, distance) => {
      if (key !== uid) {
        drops.push(pool.child(key).set({
          added_on: timestamp,
          is_close: (distance < 0.3),
        }).catch(() => Promise.resolve()));
      }
    });
  });
};
