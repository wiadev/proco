import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { AsyncStorage, Linking } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { FacebookAuthProvider, signInWithCredential, addAuthStateDidChangeListener, signOut } from 'rn-firebase-bridge/auth';
import { reauthenticateWithCredential, sendEmailVerification, updateEmail } from 'rn-firebase-bridge/user';
import {NetworkEmailValidation} from '../../core/common/Validations';

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
      console.log("payload", payload);
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

export function updateNetworkEmail(email, focusToEmail = () => {}) {
  return dispatch => {
      let buttons = [{
        text: "Learn more",
        onPress: () => {
          Actions.pop();
          setImmediate(() => {
            Actions.AboutSchoolEmails();
          });
        }
      }, {
        text: "Close",
        onPress: () => {
          Actions.pop();
          setImmediate(() => focusToEmail());
        }
      }];

      if (!email) {
        Actions.Card({
          label: "Your school email is missing",
          text: "Proco needs your school email to verify your school.",
          buttons,
          noClose: true,
        });
        return;
      }

      NetworkEmailValidation(email)
        .then((email) => {
          dispatch(reAuthenticate(() => {
            updateEmail(email.email).then(() => {
              sendEmailVerification().then(() => {
                console.log("oldu");
              }).catch((e) => {
                console.log("olmadı", e)
              })
            }).catch(e => {
              console.log(e, "firebase mail dnied");
            });
          }));
        })
        .catch(e => {

          let label, text;
          switch (e) {
            case 'CHECK_EMAIL':
            case 'INVALID_EMAIL':
              label = "Something seems to be wrong with your email address";
              text = "It doesn't appear to be a valid school address.";
              break;
            case 'ONLY_STUDENT':
              label = "Only student e-mails are accepted.";
              text = "Your university is a part of Proco but the e-mail you gave appears to be a staff address. Only students can use Proco for now.";
              break;
            case 'NETWORK_NOT_SUPPORTED':
              label = "Your university is not yet supported by Proco";
              text = "You can get in to the waiting list so we can let you know when you can use Proco at your school.";
              buttons = [{
                text: "Sounds good!",
                onPress: () => {
                  Actions.pop();
                  setImmediate(() => focusToEmail());
                }
              }];
              break;
            case 'COMMON_PROVIDER':
              label = "You have to give your university provided email addresses";
              text = "The one you've gave seems like personal one";
              break;
          }

          Actions.Card({
            label,
            text,
            buttons,
            noClose: true
          });

        });

  }
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
