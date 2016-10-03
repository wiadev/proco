import React, {Component} from "react";
import {connect} from "react-redux";
import {Actions, ActionConst, Router, Switch, Scene, Reducer} from "react-native-router-flux";

import {Login, Register, SMSVerification} from "./Authentication";
import Main from "./Main";
import Settings from "./Settings";
import UpdateYourQuestion from "./UpdateYourQuestion";
import ShootNewProfileLoop from "./ShootNewProfileLoop";
import Filters from "./Filters";
import Conversations from "./Chat/List";
import Conversation from "./Chat/Conversation";
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
        uid: state.auth.uid,
        isBoarded: state.api.data.userIs.onboarded,
      }))(Switch)}
      tabs={true}
      unmountScenes
      initial
      selector={({uid, isBoarded}) => {
        if (uid && isBoarded) {
          return 'proco';
        }
        return 'auth;'
      }}
    >
      <Scene
        key="auth"
        component={connect(state=>({
          uid: state.auth.uid,
        }))(Switch)}
        tabs={true}
        unmountScenes
        hideNavBar
        selector={({uid}) => uid ? 'Register' : 'Login'}
      >
        <Scene hideNavBar key="Login" component={Login}/>
        <Scene hideNavBar key="SelectNetwork" component={Register}/>
        <Scene hideNavBar key="Register" component={Register}/>
        <Scene hideNavBar key="SMSVerification" animation="fade" component={SMSVerification}/>
      </Scene>
      <Scene key="proco" hideNavBar>
        <Scene key="Main" component={Main} animation="fade" type={ActionConst.RESET} initial/>
        <Scene key="Settings" component={Settings} />
        <Scene key="Filters" component={Filters} />
        <Scene key="UpdateYourQuestion" component={UpdateYourQuestion} />
        <Scene key="ShootNewProfileLoop" component={ShootNewProfileLoop}/>
        <Scene key="ConversationList" component={Conversations}/>
        <Scene key="Conversations">
          <Scene key="Conversation" component={Conversation} clone/>
        </Scene>
        <Scene key="Card" isModal transparent component={Card} animationType="fade" hideNavBar/>
      </Scene>
    </Scene>
  </Scene>
);

const Routes = () => <Router createReducer={reducerCreate} scenes={scenes}/>;
export default Routes;
