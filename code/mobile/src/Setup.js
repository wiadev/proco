import React from "react";
import { Provider } from "react-redux";
import codePush from "react-native-code-push";
import { initAuth } from "./core/auth";
import configureStore from "./store";

import App from "./App";

const store = configureStore();
initAuth(store.dispatch);

// installMode of code push is ON_NEXT_RESTART and mandatoryInstallMode is IMMEDIATE already
// but let's keep it explicitly set for the sake of future referencing
@codePush({installMode: codePush.InstallMode.ON_NEXT_RESTART, mandatoryInstallMode: codePush.InstallMode.IMMEDIATE})
export default class Setup extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
