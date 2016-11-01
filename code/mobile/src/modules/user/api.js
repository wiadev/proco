import { getUserRef } from '../../core/firebase';

export const saveToken = (uid, type, token) =>
  getUserRef(uid, 'tokens').child(type).set(token);

export const isOnboarded = (state) => state.onboarded;
