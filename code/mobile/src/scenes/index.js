import React, { Component } from "react";
import { Actions, ActionConst, Router, Scene, Reducer } from "react-native-router-flux";
import Authentication from "./Authentication";
import Main from "./Main";
import Settings from "./Settings";
import UpdateYourQuestion from "./UpdateYourQuestion";
import ShootNewProfileLoop from "./ShootNewProfileLoop";
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
  <Scene key="root" unmountScenes>
    {staticPageScenes()}
    <Scene key="before" initial>
      <Scene hideNavBar key="Login" component={Authentication} initial/>
      <Scene hideNavBar key="Onboarding" component={Authentication}/>
    </Scene>
    <Scene key="after" hideNavBar>
      <Scene key="Main" component={Main} animation="fade" type={ActionConst.RESET} initial/>
      <Scene key="Settings" component={Settings}/>
      <Scene key="UpdateYourQuestion" component={UpdateYourQuestion}/>
      <Scene key="ShootNewProfileLoop" component={ShootNewProfileLoop}/>
      <Scene key="ConversationList" component={Conversations}/>
      <Scene key="Conversations">
        <Scene key="Conversation" component={Conversation} clone/>
      </Scene>
      <Scene key="Card" isModal transparent component={Card} animationType="fade" hideNavBar/>
    </Scene>
  </Scene>
);

const Routes = () => <Router createReducer={reducerCreate} scenes={scenes}/>;
export default Routes;
