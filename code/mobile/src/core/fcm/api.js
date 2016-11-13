import Permissions from "react-native-permissions";

export const requestPermission = () =>
  Permissions.requestPermission('notification')
    .then(status => {
      if (status !== 'authorized') return Promise.reject(status);
    });
