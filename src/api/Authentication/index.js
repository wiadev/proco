const firebase = require('firebase');
const FBSDK = require('react-native-fbsdk');
const runner = require('../Utils/Tasks');

const {
  LoginManager,
  AccessToken,
} = FBSDK;

const login = () => {

  return new Promise((resolve, reject) => {
    return LoginManager.logInWithReadPermissions(['public_profile', 'user_likes', 'user_friends', 'user_birthday']).then(
      (result) => {
        if (result.isCancelled) {
          reject('cancelled');
        } else {

          return AccessToken.getCurrentAccessToken().then(
            (data) => {

              const access_token = data.accessToken.toString();
              const credential = firebase.auth.FacebookAuthProvider.credential(access_token);
              return firebase.auth().signInWithCredential(credential).then((data) => {

                console.log("data", data);
                return runner('AFTER_LOGIN', {
                  access_token
                }).then((data) => {
                  console.log("after login data", data);
                })
              }).catch(function(error) {

                console.log(error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
            }
          );

        }
      },
      (error) => {
        alert('Login fail with error: ' + error);
      }
    );

  });

};

const logout = () => {};

module.exports = {
  login,
  logout
};
