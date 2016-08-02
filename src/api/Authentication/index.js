const firebase = require('firebase');
const {LoginManager, AccessToken} = require('react-native-fbsdk');
import {startAuth, stopAuth, loadAuth, goLogin} from './reducer';
import store from '../../store/configureStore';
import {Actions} from 'react-native-router-flux';

export const startChecking = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          const facebookToken = data.accessToken.toString();
          store.dispatch(goLogin(facebookToken, user.uid));
        }
      ).catch(e => {
        console.log("e", e)
      })
    } else {
      store.dispatch(loadAuth({isLoggedIn: false, isLoaded: true}));
    }
  });
};

export const facebookLogin = () => {

  store.dispatch(startAuth());

  return new Promise((resolve, reject) => {
    return LoginManager.logInWithReadPermissions(['public_profile', 'user_likes', 'user_friends', 'user_birthday']).then(
      (result) => {
        if (result.isCancelled) {
          store.dispatch(stopAuth());
          reject('Login was cancelled by you.');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              const facebookToken = data.accessToken.toString();
              return firebase.auth().signInWithCredential(
                firebase.auth.FacebookAuthProvider.credential(facebookToken)
              );
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
