const functions = require('firebase-functions');
const firebase = require('firebase');
const GeoFire = require('geofire');

module.exports = functions.database().path('/ocean/{key}')
  .on('write', (event) => {

    const poolAdmin = event.data.adminRef.root.child(`pools/${event.params.key}`);

    if (!event.data.child('l').val()) {
      return poolAdmin.set(null);
    }

    const locationData = event.data.child('l').val();
    const location = [locationData[0], locationData[1]];

    /* This is not needed since we should take care of this in the app.
    const previousLocationData = event.data.previous.child('l').val();

    // If the user hasn't moved more than 350 meters, no need to refresh their pool.
    if (previousLocationData) {
       const previousLocation = [previousLocationData[0], previousLocationData[1]];
       if (!(GeoFire.distance(location, previousLocation) > 0.35)) return Promise.resolve(); 
    }
    */

    const geoFire = new GeoFire(event.data.adminRef.parent);

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
          
          const pool = event.data.ref.root.child(`pools/${event.params.key}`);

          if (dropKeys.length === 0) {
            return poolAdmin.set(null).then(() => resolve());
          }

          return poolAdmin.set(true).then(() => 
            Promise.all(dropKeys.map(key => 
              pool.child(key).set(drops[key]).catch(e => Promise.resolve()) // We resolve on catch here because of how we use the validations
            ))
              .then(() => resolve())
              .catch(e => {
                console.log("Catched something", e);
                return resolve();
              })
          );

        }
      });


      geoQuery.on("key_entered", (key, location, distance) => {
        if (key !== event.params.key) {
          drops[key] = {
            added_on: firebase.database.ServerValue.TIMESTAMP,
            is_close: (distance < 0.3 ? true : false),
          };
        }
      });


    });

  });
