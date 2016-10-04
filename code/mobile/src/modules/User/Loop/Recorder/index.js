import React from 'react';
import { requireNativeComponent, NativeModules, View } from 'react-native';

import styles from './styles';

const constants = {
  // Flash enum
  SCFlashModeOff: 0,
  SCFlashModeOn: 1,
  SCFlashModeAuto: 2,
  SCFlashModeLight: 3
};

export default class Recorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recording: false,
    }
  }

  static constants = constants;

  // Start recording of the current session
  record() {
    if (this.state.recording) return;

    this.setState({
      recording: true
    });

    NativeModules.RNRecorderManager.record();
  }

  // Pause recording of the current session
  pause() {
    if (!this.state.recording) return;

    var onNewSegment = this.props.onNewSegment || function () {
      };
    NativeModules.RNRecorderManager.pause(onNewSegment);
    this.setState({
      recording: false
    })
  }

  // Save the recording
  save(callback) {
    NativeModules.RNRecorderManager.save(callback);
  }

  // Remove last segment of the session
  removeLastSegment() {
    NativeModules.RNRecorderManager.removeLastSegment();
  }

  // Remove all segments of the session
  removeAllSegments() {
    NativeModules.RNRecorderManager.removeAllSegments();
  }

  // Remove segment at the specified index
  removeSegmentAtIndex(index) {
    NativeModules.RNRecorderManager.removeSegmentAtIndex(index);
  }

  /*** RENDER ***/

  render() {
    const config = Object.assign({
      autoSetVideoOrientation: false,
      flashMode: constants.SCFlashModeOff,
      video: {
        enabled: true,
        bitrate: 2000000, // 2Mbit/s
        timescale: 1, // Higher than 1 makes a slow motion, between 0 and 1 makes a timelapse effect
        format: "MPEG4",
        quality: "HighestQuality", // HighestQuality || MediumQuality || LowQuality
      },
    }, this.props.config);

    const nativeProps = Object.assign({}, this.props, {
      config: config,
      device: this.props.device || "front",
    });

    return (
      <View style={styles.wrapper}>
        <RNRecorder {...nativeProps} style={{flex: 1}} />

        <View style={styles.containerWrapper}>
          <View style={[styles.container, this.props.containerStyle]}>{this.props.children}</View>
        </View>
      </View>
    );
  }
}

Recorder.propTypes = {
  config: React.PropTypes.object,
  device: React.PropTypes.string,
  onNewSegment: React.PropTypes.func,
  containerStyle: React.PropTypes.any
};

const RNRecorder = requireNativeComponent('RNRecorder', Recorder);
