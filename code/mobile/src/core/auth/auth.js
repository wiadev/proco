import { AccessToken, LoginManager } from "react-native-fbsdk";
import { auth as firebaseAuth } from "../firebase";
import { authActions } from "./actions";

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {

        if (authUser) {
          dispatch(authActions.signInFulfilled(authUser));
        } else {
          dispatch(authActions.signOutFulfilled());
        }

        resolve();
        unsubscribe();
      },

      error => reject(error)
    );
  });
}

export function getFacebookAccessToken(dispatch) {
  return AccessToken.getCurrentAccessToken().then(data => {
    if (data) {
      dispatch(authActions.signIn(data.accessToken.toString()));
      return Promise.resolve();
    } else {
      return LoginManager.logInWithReadPermissions(
        ['public_profile', 'user_likes', 'user_friends', 'user_birthday']
      ).then(result => {
        if (result.isCancelled) {
          return Promise.reject('FACEBOOK_AUTH_CANCELLED');
        } else {
          return getFacebookAccessToken(dispatch);
        }
      });
    }
  });
}
