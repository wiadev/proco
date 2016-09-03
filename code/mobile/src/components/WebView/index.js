import React from 'react';
import { Actions } from 'react-native-router-flux';
import {Dimensions, View, WebView} from 'react-native';

import Header from '../Header';
const height = Dimensions.get('window').height;

export default function (props) {
  return (
    <View style={{flex: 1}}>
      <Header
        theme="dark"
        rightActorType="text"
        rightActor="Done"
        rightAction={Actions.pop}
        title={props.title}
      />
      <WebView
        source={{uri: props.uri}}
        style={{height}}
      />
    </View>
  );
}
