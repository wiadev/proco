import React, {Component} from "react";
import {connect} from "react-redux";
import {Actions, ActionConst, Router, Switch, Scene, Reducer} from "react-native-router-flux";
import {Login, Register, SMSVerification} from "../../scenes/Authentication";
import Main from "../../scenes/Main";
import Settings from "../../scenes/Settings";
import UpdateYourQuestion from "../../scenes/UpdateYourQuestion";
import ShootNewProfileLoop from "../../scenes/ShootNewProfileLoop";
import Filters from "../../scenes/Filters";
import Conversations from "../../scenes/Chat/List";
import Conversation from "../../scenes/Chat/Conversation";
import WebView from "../../components/WebView";
import Card from "../../components/Card";
import BlockerActivity from "../../components/BlockerActivity";
import * as StaticPages from "./StaticPages";

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
        isLoadedAuth: state.auth.isLoaded,
        isLoadedIs: state.api.data.userIs.isLoaded,
        isBoarded: state.api.data.userIs.onboarded,
      }))(Switch)}
      tabs={true}
      unmountScenes
      initial
      selector={(props) => {
        const {uid, isLoadedAuth, isLoadedIs, isBoarded} = props;
        console.log("hey", isLoadedAuth, isLoadedIs, isBoarded, props)
        if (!isLoadedAuth || (uid && !isLoadedIs)) return 'BlockerActivity';
        if (!uid || !isBoarded) return 'auth';
        if (uid && isBoarded) return 'proco';
      }}
    >
      <Scene hideNavBar key="BlockerActivity" component={BlockerActivity}/>
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
        <Scene key="Settings" component={Settings} animation="fade" />
        <Scene key="Filters" component={Filters} animation="fade" />
        <Scene key="UpdateYourQuestion" component={UpdateYourQuestion} direction="vertical"/>
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
