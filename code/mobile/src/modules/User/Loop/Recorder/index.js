import React from "react";
import { NativeModules, View, Text } from "react-native";
import Camera from "react-native-camera";
import reactMixin from "react-mixin";
import reactTimerMixin from "react-timer-mixin";
import styles from "./styles";

@reactMixin.decorate(reactTimerMixin)
export default class Recorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
    }
  }

  capture(callback) {
    if (this.state.inProgress) return;

    console.log("started capturing");
    this.setState({
      inProgress: true,
    });

    this.camera.capture().then(data => {
      const path = data.path;

      console.log("captured", data);
      NativeModules.ProcoLoopGenerator.generateLoop(path, (_, finalImagePath) => {
        console.log("processed", _, finalImagePath);

        //callback(null);
      });

    });

    this.setTimeout(() => {
      console.log("done capturing");
      this.camera.stopCapture();
      this.setState({
        inProgress: false,
      });
    }, 550);

  }

  render() {

    return (
      <View style={styles.wrapper}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.container}
          aspect={Camera.constants.Aspect.fill}
          captureAudio={false}
          captureMode={Camera.constants.CaptureMode.video}
          captureTarget={Camera.constants.CaptureTarget.temp}
          type={this.props.device || "front"}
        >
          {this.state.inProgress || <Text style={styles.capture} onPress={this.capture.bind(this)}>[CAPTURE]</Text>}
        </Camera>
      </View>
    );
  }
}
