firebase.initializeApp({
  apiKey: "AIzaSyCFOGhparb6dYAwoKtgvnHZ37hh0EARsOQ",
  authDomain: "proco-app.firebaseapp.com",
  databaseURL: "https://proco-app.firebaseio.com",
  storageBucket: "proco-app.appspot.com",
});

function init() {
  firebase.auth().signOut().then(() => 
    firebase.auth().signInWithCustomToken(getParameterByName('token')).then(user => {
      console.log("logged in as ", user.uid);
      initMap();
    }));
}

function initMap() {

  var firebaseRef = firebase.database().ref('tests/ocean');
  var currentUserPool = firebase.database().ref(`pools/${firebase.auth().currentUser.uid}`);
  var geoFire = new GeoFire(firebaseRef);

  var geoQuery = geoFire.query({
    center: [0, 0],
    radius: 1
  });

  var drops = {};

  var myLatLng = {
    lat: 41.044092,
    lng: 29.001667
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: myLatLng
  });

  google.maps.event.addListener(map, 'click', function(event) {
    geoQuery.updateCriteria({
      center: [event.latLng.lat(), event.latLng.lng()]
    });
    try {
      geoFire.set(firebase.auth().currentUser.uid, [event.latLng.lat(), event.latLng.lng()])
    } catch (e) {
      console.log(e, "user didn't fit us :)")
    }
  });





  // Attach event callbacks to the query
  var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location) {
    console.log("entered", key, location);
    drops[key] = new google.maps.Marker({
      position: {
        lat: location[0],
        lng: location[1]
      },
      map: map,
      title: key,
      label: key
    });

      currentUserPool.child(key).set(true).then(() => {
        console.log("we are loved");
      }).catch(e => {
        console.log("meh", e)
      })
  });

  var onKeyExitedRegistration = geoQuery.on("key_exited", function(key, location) {
        console.log("exited", key, location);

    drops[key].setMap(null);
     try {
      currentUserPool.child(key).set(null);
    } catch (e) {
       console.log(e, "user didn't fit us :)")
    }
  });

  var onKeyMovedRegistration = geoQuery.on("key_moved", function(key, location) {
        console.log("moved", key, location);

    drops[key].setPosition({
      lat: location[0],
      lng: location[1]
    })
  });


  /*************/
  /*  HELPERS  */
  /*************/
  /* Logs to the page instead of the console */
  function log(message) {
    console.log(message);
  }



}