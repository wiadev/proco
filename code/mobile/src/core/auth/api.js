import { AccessToken, LoginManager } from "react-native-fbsdk";
import { auth as firebaseAuth } from "../firebase";
import { signIn, signInFulfilled, signOutFulfilled } from "./actions";

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      authUser => {

        if (authUser) {
          dispatch(signInFulfilled(authUser.uid, authUser.displayName));
        } else {
          dispatch(signOutFulfilled());
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
      dispatch(signIn(data.accessToken.toString()));
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

export const getUID = state => state.auth.get('uid');
