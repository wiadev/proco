function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function updateMessage(message = 'Loading ...') {
  document.querySelector("#message").innerText = message;
}

document.addEventListener('DOMContentLoaded', function() {
  // TODO: Implement getParameterByName()

console.log("here")
  // Get the action to complete.
  var mode = getParameterByName('mode');
  // Get the one-time code from the query parameter.
  var actionCode = getParameterByName('oobCode');
  // (Optional) Get the API key from the query parameter.
  var apiKey = getParameterByName('apiKey');

  // Configure the Firebase SDK.
  // This is the minimum configuration required for the API to be used.
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDtebbExST_vz3cMMy_YLdIrNNKohIGlNc",
    authDomain: "hello-4c376.firebaseapp.com",
    databaseURL: "https://hello-4c376.firebaseio.com",
    storageBucket: "hello-4c376.appspot.com",
  };
  var app = firebase.initializeApp(config);

  var auth = app.auth();

  // Handle the user management action.
  switch (mode) {
    case 'resetPassword':
      // Display reset password handler and UI.
      handleResetPassword(auth, actionCode);
      break;
    case 'recoverEmail':
      // Display email recovery handler and UI.
      handleRecoverEmail(auth, actionCode);
      break;
    case 'verifyEmail':
      // Display email verification handler and UI.
      handleVerifyEmail(auth, actionCode);
      break;
    default:
      // Error: invalid mode.
  }
}, false);