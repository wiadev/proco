import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { AsyncStorage, Linking } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { FacebookAuthProvider, signInWithCredential, addAuthStateDidChangeListener, signOut } from 'rn-firebase-bridge/auth';
import { reauthenticateWithCredential } from 'rn-firebase-bridge/user';

import { hideStatusBar, showStatusBar } from '../StatusBar/actions';
import React from 'react';

import {
  STARTED,
  SET,
  LOADED,
} from './actionTypes';

import {
  createAlert,
} from '../InAppAlert/actions';

import {
  loadUser,
  updateUserLocally,
  syncLocalUserToDatabase,
  updateUser,
} from '../User/actions';

import {
  serverAction
} from '../../core/Api/actions';

export const reAuthenticate = (after) => {
  return (dispatch, getState) => {
    const { tokens } = getState();

    const credential = FacebookAuthProvider.credential(tokens.facebook);
    reauthenticateWithCredential(credential).then(() => {
      if (after) {
        after(dispatch, getState);
      }
    }).catch(e => console.log("Problem on re auth", e))

  };
};

export const startCheckingAuth = () => {
  return (dispatch, getState) => {
    dispatch(syncFacebookToken());
    addAuthStateDidChangeListener(payload => {
      const { auth, isUser, user } = getState();
      if (payload) {

        if (auth.uid === null) {

          dispatch({
            type: SET,
            payload: {
              uid: payload.user.uid,
            }
          });

        }

        if (isUser.verified !== payload.user.emailVerified) {
          dispatch(updateUser('is', {
            verified: payload.user.emailVerified,
          }));
        }

        if (user.email !== payload.user.email) {
          dispatch(updateUser('info', {
            email: payload.user.email,
          }));
        }

        dispatch(loadUser('info'));
        dispatch(loadUser('is', true));
        dispatch(syncLocalUserToDatabase('tokens'));

      } else if (auth.uid === null && !auth.isInProgress) {
        dispatch(logout());
      }
    });
  };
};

function syncFacebookToken() {
  return (dispatch, getState) => {
    const { tokens, auth } = getState();
    AccessToken.getCurrentAccessToken()
      .then((data) => {
        if (data) {
          const token = data.accessToken.toString();

          if (tokens.facebook !== token) {
            dispatch(updateUserLocally('tokens', {
              facebook: token
            }));
          }

          if (auth.uid === null) {
            const credential = FacebookAuthProvider.credential(token);
            signInWithCredential(credential);
          }
        } else {
          console.log ("We have no Facebook token");
        }
      });
  };
}

export function login() {
  return (dispatch) => {

    dispatch({ type: STARTED });
    dispatch(hideStatusBar());
    LoginManager.logInWithReadPermissions(
      ['public_profile', 'user_likes', 'user_friends', 'user_birthday']
    ).then((result) => {
      dispatch(showStatusBar());
 
      if (result.isCancelled) {

        dispatch({ type: LOADED });

        Actions.Card({
          label: `You've cancelled the login process`,
          text: 'If you are having trouble logging in, please contact us. If you like to login with a different account, switch accounts on Safari.',
          buttons: [
            {
              text: "Contact",
              onPress: Actions.Contact,
            },
            {
              text: "Open Safari",
              onPress: () => {
                Actions.pop();
                Linking.openURL("https://m.facebook.com/");
              },
            }
          ]
        });

      } else {
        dispatch(syncFacebookToken());
      }
    });

  };
}

export function logout() {
  return dispatch => {
    Promise.all([signOut(), AsyncStorage.clear()]).then(() => {
      LoginManager.logOut();
      dispatch({ type: 'RESET' });
      Actions.Login();
    });
  }
}
