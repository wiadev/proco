import React, {Component} from 'react';
import {Actions, ActionConst, Router, Scene, Switch, Reducer} from 'react-native-router-flux';
import Wrapper from './Wrapper';

import { Login, Register } from '../../scenes/Authentication';
import Main from '../../scenes/Main';

import WebView from '../../components/WebView';
import Card from '../../components/Card';
import * as StaticPages from './StaticPages';
import Blocked from './Blocked';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const staticPageScenes = () => {
  return Object.keys(StaticPages).map(page => {
    return <Scene
      component={WebView}
      isModal
      hasHeader
      {...Object.assign({
        animationType: 'slide',
      }, StaticPages[page])}
    />;
  });
};

const scenes = Actions.create(
  <Scene key="wrapper" component={Wrapper} hideNavBar>
      <Scene
        key="root"
        component={Switch}
        unmountScenes
        selector={props => props.auth.canAccessApp ? 'main' : 'auth'}
      >
        <Scene key="auth" hideNavBar>
          <Scene key="Login" component={Login} />
          <Scene key="Register" component={Register} initial={true} />
        </Scene>
        <Scene key="app" hideNavBar>
          <Scene key="Main" component={Main} />
        </Scene>
      </Scene>
      <Scene key="Card" isModal transparent component={Card} animationType="fade" hideNavBar />
      <Scene
        component={Card}
        {...Blocked}
      />
    {staticPageScenes()}
  </Scene>
);

export default function Routes (props) {
  return <Router createReducer={reducerCreate} scenes={scenes} {...props} />;
};
