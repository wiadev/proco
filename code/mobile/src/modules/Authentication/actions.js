import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { AsyncStorage, Linking } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { hideStatusBar, showStatusBar } from '../StatusBar/actions';
import React from 'react';

import {
  STARTED,
  LOADED,
  SET,
  UNLOAD,
} from './actionTypes';

import {
  createAlert,
} from '../InAppAlert/actions';

import {
  loadUser,
  updateUser,
} from '../User/actions';

import {
  serverAction
} from '../../core/Api/actions';

function getFacebookAccessToken() {

  return new Promise ((resolve, reject) => {
    return AccessToken.getCurrentAccessToken().then((data) => {
      if (data) {
        resolve(data.accessToken.toString());
      } else {
        reject();
      }
    });
  });

}

const getAuth = (isFacebookReturn = false) =>{
  return (dispatch) => {
    const login = (user = null) => {
      getFacebookAccessToken()
        .then(facebook_token => {
          if (user) dispatch(loadAuth(user, facebook_token));
          return firebase.auth().signInWithCredential(
            firebase.auth.FacebookAuthProvider.credential(facebook_token)
          ).then(user => {
            dispatch(loadAuth(user, facebook_token))
          });
        })
        .catch((e) => {
          dispatch(logout());
        });
    };

    if (isFacebookReturn) {
      login();
      return;
    }

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      login(user);
    });
  };
};

export const loadAuth = (user, facebook_token) => {
  return (dispatch, getState) => {
    const { auth, tokens } = getState();

    if (!(auth.uid && tokens.facebook)) {
      if (!user && !facebook_token) {
        dispatch(getAuth());
        return;
      }
      
      const { uid } = user;

      dispatch({
        type: SET,
        payload: {
          uid
        }
      });

      dispatch(updateUser('tokens', {
        facebook: facebook_token,
        firebase: firebase_token,
      }));

    }

    dispatch(loadUser('info'));

    dispatch(serverAction({
      type: 'USER_PING',
      payload: {
        event: 'LOGGED_IN'
      }
    }));

  }
};

export function login() {
  return (dispatch) => {

    dispatch({ type: STARTED });
    dispatch(hideStatusBar());
    LoginManager.logInWithReadPermissions(
      ['public_profile', 'user_likes', 'user_friends', 'user_birthday']
    ).then((result) => {
      dispatch(showStatusBar());

      if (result.isCancelled) {


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

        dispatch(logout());

      } else {
        dispatch(getAuth());
      }
    });

  };
}

export function setAppAccess(canAccessApp = false) {
  return {
    type: SET,
    payload: {
      canAccessApp
    }
  }
}

export function logout() {
  return dispatch => {
    Promise.all([AsyncStorage.clear(), firebase.auth().signOut()]).then(() => {
      LoginManager.logOut();
      dispatch({ type: 'RESET' });
      Actions.Login();
    });
  }
}
