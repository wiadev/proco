const firebase = require('firebase');
const GeoFire = require('geofire');

module.exports = (event, trigger = null) => {

    const uid = event.params.key;

    const oceanAdmin = event.data.adminRef.root.child(`ocean`);

    const ref = event.data.ref.root.child(`ocean/${uid}`);
    const refAdmin = oceanAdmin.child(uid);

    const pool = event.data.ref.root.child(`pools/${uid}`);
    const poolAdmin = event.data.adminRef.root.child(`pools/${uid}`);

    const locationPromise = (trigger === 'ocean' ? Promise.resolve(event.data.child('l')) : ref.child('l').once('value'));

    return locationPromise.then(locationSnap => {
      const locationData = locationSnap.val();
      if (!locationData) {
        return poolAdmin.set(null);
      }

      const location = [locationData[0], locationData[1]];

      const geoFire = new GeoFire(oceanAdmin);

      return new Promise((resolve, reject) => {
        const geoQuery = geoFire.query({
          center: location,
          radius: 1,
        });

        let drops = {};

        geoQuery.on("ready", () => {
          const dropKeys = Object.keys(drops);
          const radius = geoQuery.radius();
          if (dropKeys.length < 10 && radius < 5) { // If we have less than 10 drops and radius is less than 5 km, up the radius
            geoQuery.updateCriteria({
              radius: radius + 1,
            });
          } else {
            geoQuery.cancel();

            if (dropKeys.length === 0) {
              return pool.set(null).then(() => resolve());
            }

            return Promise.all(dropKeys.map(key =>
              pool.child(key).set(drops[key]).catch(e => Promise.resolve()) // We resolve on catch here because of how we use the validations
            ))
              .then(() => resolve())
              .catch(e => {
                console.log("Catched something", e);
                return resolve();
              });

          }
        });


        geoQuery.on("key_entered", (key, location, distance) => {
          if (key !== uid) {
            drops[key] = {
              added_on: firebase.database.ServerValue.TIMESTAMP,
              is_close: (distance < 0.3 ? true : false),
            };
          }
        });


      });
    });

};
