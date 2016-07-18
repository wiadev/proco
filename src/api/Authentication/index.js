const firebase = require('firebase');
const FBSDK = require('react-native-fbsdk');

const {
  LoginManager,
  AccessToken,
} = FBSDK;

const login = () => {

  return new Promise((resolve, reject) => {
    return LoginManager.logInWithReadPermissions(['public_profile', 'user_likes', 'user_friends', 'user_birthday']).then(
      (result) => {
        if (result.isCancelled) {
          reject('Login was cancelled by you.');
        } else {
          return AccessToken.getCurrentAccessToken().then(
            (data) => {
              const access_token = data.accessToken.toString();
              const credential = firebase.auth.FacebookAuthProvider.credential(access_token);
              return firebase.auth().signInWithCredential(credential).then(() => {
                resolve();
              });
            }
          );

        }
      },
      (error) => {
        reject(error);
      }
    );

  });

};

const logout = () => {};

module.exports = {
  login,
  logout
};
