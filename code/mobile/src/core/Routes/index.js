import React, {Component} from 'react';
import {Actions, ActionConst, Router, Scene, Reducer} from 'react-native-router-flux';
import Wrapper from './Wrapper';

import { Login, Register, EmailVerification } from '../../scenes/Authentication';
import Main from '../../scenes/Main';
import Settings from '../../scenes/Settings';
import Filters from '../../scenes/Filters';
import Conversations from '../../scenes/Chat/List';
import Conversation from '../../scenes/Chat/Conversation';
import WebView from '../../components/WebView';
import Card from '../../components/Card';
import * as StaticPages from './StaticPages';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log("router", state, action);
    if (action.type === 'CLEAN') {
      return defaultReducer(null, {
        type: 'RootContainerInitialAction',
      });
    }
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
  <Scene key="wrapper" component={Wrapper} hideNavBar unmountScenes>
    <Scene
      key="root"
      hideNavBar
    >
        <Scene key="Login" component={Login}  initial />
        <Scene key="Register" component={Register} />
        <Scene key="EmailVerification" animation="fade" component={EmailVerification} />
        <Scene key="Main" component={Main} animation="fade" />
        <Scene key="Settings" component={Settings} direction="vertical" />
        <Scene key="Filters" component={Filters} direction="vertical" />
        <Scene key="ConversationList" component={Conversations}  />
        <Scene key="Conversations">
          <Scene key="Conversation" component={Conversation} clone  />
        </Scene>
    </Scene>
    <Scene key="Card" isModal transparent component={Card} animationType="fade" hideNavBar />
    {staticPageScenes()}
  </Scene>
);


export default function Routes (props) {
  return <Router createReducer={reducerCreate} scenes={scenes} {...props} />;
};
