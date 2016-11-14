export const SIGN_IN = 'Proco/Auth/SignIn';
export const SIGN_IN_FAILED = 'Proco/Auth/SignInFailed';
export const SIGN_IN_FULFILLED = 'Proco/Auth/SignInFulfilled';

export const SIGN_OUT = 'Proco/Auth/SignOut';
export const SIGN_OUT_FAILED = 'Proco/Auth/SignOutFailed';
export const SIGN_OUT_FULFILLED = 'Proco/Auth/SignOutFulfilled';

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
