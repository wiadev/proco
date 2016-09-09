import {database, logEvent, timestamp} from "../../core/Api";
import {assign} from "../../core/utils";
import {getProfileLoop} from "./api";

export const post = (thread_id, payload) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

  };
};

export const mute = (thread_id) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

  };
};

export const unmute = (thread_id) => {
  return (dispatch, getState) => {
    const {auth: {uid}} = getState();

  };
};
