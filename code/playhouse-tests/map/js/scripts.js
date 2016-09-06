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

  var firebaseRef = firebase.database().ref('ocean');
  var geoFire = new GeoFire(firebaseRef);


  var myLatLng = {
    lat: 41,
    lng: 29
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
      position: {
        lat: 41,
        lng: 29
      },
      map: map,
      title: "ME",
      label: "ME"
    });


  google.maps.event.addListener(map, 'click', function(event) {
    geoFire.set(firebase.auth().currentUser.uid, [event.latLng.lat(), event.latLng.lng()]).catch(e => Promise.resolve());

    marker.setPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });

  });

  var currentUserPool = firebase.database().ref(`pools/${firebase.auth().currentUser.uid}`).limitToFirst(5);

  var drops = {};

  function handleChildChange(data) {
    drops[data.key] = data.val();
    console.log("Current drops:", drops);
  }

  currentUserPool.on('child_added', handleChildChange);

  currentUserPool.on('child_changed', handleChildChange);

  currentUserPool.on('child_removed', function(data) {
    delete drops[data.key];
    console.log("Current drops:", drops);
  });



}