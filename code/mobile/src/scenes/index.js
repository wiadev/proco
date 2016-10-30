import React, {Component} from "react";
import {connect} from "react-redux";
import {Actions, ActionConst, Router, Switch, Scene, Reducer} from "react-native-router-flux";

import Authentication from "./Authentication";
import Main from "./Main";
import * as StaticPages from "./StaticPages";

import WebView from "../components/WebView";
import Card from "../components/Card";

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    if (action.type === 'CLEAN') {
      return defaultReducer(null, {
        type: 'RootContainerInitialAction',
      });
    }
    return defaultReducer(state, action);
  };
};

const staticPageScenes = (pages = StaticPages) => {
  return Object.keys(pages).map(page => {
    return <Scene
      component={WebView}
      hideNavBar
      direction="vertical"
      key={page}
      {...pages[page]}
    />;
  });
};

const scenes = Actions.create(
  <Scene key="root">
    {staticPageScenes()}
    <Scene
      key="app"
      component={connect(state=>({
        uid: state.auth.get('uid'),
      }))(Switch)}
      tabs={true}
      unmountScenes
      initial
      selector={({uid}) => uid ? 'proco' : 'auth'}
    >
      <Scene key="proco" hideNavBar>
        <Scene hideNavBar key="auth" component={Authentication} />
      </Scene>
      <Scene hideNavBar key="auth" component={Authentication} />
    </Scene>
  </Scene>
);

const Routes = () => <Router createReducer={reducerCreate} scenes={scenes}/>;
export default Routes;
