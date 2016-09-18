const firebase = require('firebase');
const GeoFire = require('geofire');
const timestamp = firebase.database.ServerValue.TIMESTAMP;

const dropSetter = (pool, key, data) => 
  pool.child(key).set(data).catch(() => Promise.resolve());

module.exports = (event) => {

    console.log("here4");
    
    const uid = event.params.uid;

    const oceanAdmin = event.data.adminRef.root.child(`ocean`);
    const status = oceanAdmin.child(`statuses/${uid}`);
    const index = oceanAdmin.child(`index`);

    return index.child(`${uid}/l`).once('value').then((snap) => {
      const locationData = snap.val();

      if (!locationData) {
        return status.set({
          status: 'NO_LOCATION',
          last_checked: timestamp,
        });
      }

      const location = [locationData[0], locationData[1]];

      const geoFire = new GeoFire(index);

      return new Promise((resolve, reject) => {
        const geoQuery = geoFire.query({
          center: location,
          radius: 1,
        });

        let drops = [];
        const pool = event.data.ref.root.child(`ocean/pools/${uid}`);

        geoQuery.on("ready", () => {

          const radius = geoQuery.radius();
          if (drops.length < 10 && radius < 5) { // If we have less than 10 drops and radius is less than 5 km, up the radius
            geoQuery.updateCriteria({
              radius: radius + 1,
            });
          } else {

            geoQuery.cancel();

            console.log("here5");

            if (drops.length === 0) {
              return status.set({
                status: 'EMPTY',
                last_checked: timestamp,
              });
            }

           
            Promise.all(drops)
              .then(() => {
                console.log("then at promise all");
                status.set({
                  status: 'GENERATED',
                  last_checked: timestamp,
                })
                .then(() => resolve());
              })
              .catch(e => {
                console.log("Catched something", e);
                status.set({
                  status: 'FAILED',
                  last_checked: timestamp,
                })
                .then(() => reject(e));
              });

          }
        });


        geoQuery.on("key_entered", (key, location, distance) => {
          if (key !== uid) {
            drops.push(dropSetter(pool, key, {
              added_on: timestamp,
              is_close: (distance < 0.3 ? true : false),
            }));
          }
        });


      });

    });

};
