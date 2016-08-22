import React from 'react';

import {Dimensions, View, WebView} from 'react-native';
const height = Dimensions.get('window').height;

export default function (props) {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: props.uri}}
        style={{height}}
      />
    </View>
  );
}
