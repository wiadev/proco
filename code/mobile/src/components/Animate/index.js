import React from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import Card from '../Card';
var {
  height: deviceHeight
} = Dimensions.get("window");

var styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: new Animated.Value(deviceHeight)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 200,
      toValue: 0
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 200,
      toValue: deviceHeight
    }).start(Actions.pop);
  }

  render() {
    return (
      <View style={[styles.container, {
        backgroundColor: 'rgba(120,55,175, 0.7)'
      }]}>
        <Animated.View style={[styles.container,
        {transform: [{translateY: this.state.offset}]}]}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}
