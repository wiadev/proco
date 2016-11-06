import { getUserRef } from "../../core/firebase";

export const saveToken = (uid, type, token) =>
  getUserRef(uid, `tokens`).child(type).set(token);

export const setInfo = (uid, type, value) =>
  getUserRef(uid, `info`).child(type).set(value);

export const saveSetting = (uid, type, value) =>
  getUserRef(uid, `settings`).child(type).set(value);
