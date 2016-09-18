import {LoginManager, AccessToken} from "react-native-fbsdk";
import {AsyncStorage, Linking} from "react-native";
import {Actions} from "react-native-router-flux";
import {auth as coreAuth, facebookCredential} from "../../core/Api";
import {afterLoginActions,beforeLogoutActions} from '../User/actions';
import React from "react";
import {STARTED, SET, LOADED} from "./actionTypes";
import {update} from "../User/actions";

export function handleAuth(data) {
  if (!data) data = {};
  const { uid = null } = data;
  return (dispatch, getState) => {

    const {auth} = getState();

    if (uid && auth.uid !== uid) {
      dispatch({
        type: SET,
        payload: {
          uid
        }
      });

      dispatch(afterLoginActions());

    } else if (!uid && auth.uid) {
      dispatch(logout());
    }

    dispatch(syncFacebookToken());

  };
}

export function syncFacebookToken() {
  return (dispatch, getState) => {
    console.log("should be here twice");
    const {auth: {uid}} = getState();
    AccessToken.getCurrentAccessToken()
      .then((data) => {
        if (data) {
          const token = data.accessToken.toString();

          if (!uid) {
            coreAuth.signInWithCredential(facebookCredential(token));
            return;
          }

          dispatch(update('tokens', {
            facebook: token
          }));

        } else {
          console.log("We have no Facebook token");
          dispatch(logout());
        }
      });
  };
}

export function login() {
  return (dispatch) => {

    dispatch({type: STARTED});

    LoginManager.logInWithReadPermissions(
      ['public_profile', 'user_likes', 'user_friends', 'user_birthday']
    ).then((result) => {
      if (result.isCancelled) {

        dispatch({type: LOADED});

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
    dispatch(beforeLogoutActions());
    Promise.all([AsyncStorage.clear(), coreAuth.signOut()]).then(() => {
      LoginManager.logOut();
      dispatch({type: 'RESET'});
      dispatch({type: LOADED});
    });
  }
}
