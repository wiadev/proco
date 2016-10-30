export const authActions = {
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED',
  SIGN_IN_FULFILLED: 'SIGN_IN_FULFILLED',

  SIGN_OUT: 'SIGN_OUT',
  SIGN_OUT_FAILED: 'SIGN_OUT_FAILED',
  SIGN_OUT_FULFILLED: 'SIGN_OUT_FULFILLED',

  signIn: facebookAccessToken => ({
    type: authActions.SIGN_IN,
    payload: {facebookAccessToken}
  }),

  signInFailed: error => ({
    type: authActions.SIGN_IN_FAILED,
    payload: {error}
  }),

  signInFulfilled: authUser => ({
    type: authActions.SIGN_IN_FULFILLED,
    payload: {authUser}
  }),

  signOut: () => ({
    type: authActions.SIGN_OUT
  }),

  signOutFailed: error => ({
    type: authActions.SIGN_OUT_FAILED,
    payload: {error}
  }),

  signOutFulfilled: () => ({
    type: authActions.SIGN_OUT_FULFILLED
  })
};
