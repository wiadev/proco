import {LoginManager, AccessToken} from "react-native-fbsdk";
import {AsyncStorage, Linking} from "react-native";
import {Actions} from "react-native-router-flux";
import {base, database} from "../../core/Api";
import {startWatching, takeOnline} from "../../core/Api/firebase";
import {hideStatusBar, showStatusBar} from "../StatusBar/actions";
import React from "react";
import {STARTED, SET, LOADED} from "./actionTypes";
import {updateUser} from "../User/actions";

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

      dispatch(takeOnline());
      dispatch(startWatching('userInfo', database.ref(`users/info/${uid}`)));
      dispatch(startWatching('userIs', database.ref(`users/is/${uid}`)));
      dispatch(startWatching('userSettings', database.ref(`users/settings/${uid}`)));
      dispatch(startWatching('userFilters', database.ref(`users/filters/${uid}`)));
      dispatch(startWatching('pool', database.ref(`pools/${uid}`)));

      console.log("login")
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
            var credential = base.auth.FacebookAuthProvider.credential(token);
            base.auth().signInWithCredential(credential);
            return;
          }

          dispatch(updateUser('tokens', {
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
    dispatch(hideStatusBar());
    LoginManager.logInWithReadPermissions(
      ['public_profile', 'user_likes', 'user_friends', 'user_birthday']
    ).then((result) => {
      dispatch(showStatusBar());

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
    Promise.all([AsyncStorage.clear()]).then(() => {
      base.unauth();
      LoginManager.logOut();
      dispatch({type: 'RESET'});
      dispatch({type: LOADED});
    });
  }
}
