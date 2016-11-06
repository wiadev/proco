export const SIGN_IN = 'proco/auth/SIGN_IN';
export const SIGN_IN_FAILED = 'proco/auth/SIGN_IN_FAILED';
export const SIGN_IN_FULFILLED = 'proco/auth/SIGN_IN_FULFILLED';

export const SIGN_OUT = 'proco/auth/SIGN_OUT';
export const SIGN_OUT_FAILED = 'proco/auth/SIGN_OUT_FAILED';
export const SIGN_OUT_FULFILLED = 'proco/auth/SIGN_OUT_FULFILLED';

export const signIn = facebookAccessToken => ({
  type: SIGN_IN,
  payload: {facebookAccessToken}
});

export const signInFailed = error => ({
  type: SIGN_IN_FAILED,
  payload: {error}
});

export const signInFulfilled = (uid, name) => ({
  type: SIGN_IN_FULFILLED,
  payload: {uid, name}
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const signOutFailed = error => ({
  type: SIGN_OUT_FAILED,
  payload: {error}
});

export const signOutFulfilled = () => ({
  type: SIGN_OUT_FULFILLED
});
