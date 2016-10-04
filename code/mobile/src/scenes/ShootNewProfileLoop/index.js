import React from "react";
import { connect } from "react-redux";
import {
  StatusBar,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions
} from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/MaterialIcons";
import reactMixin from "react-mixin";
import reactTimerMixin from "react-timer-mixin";

import Recorder from '../../modules/User/Loop/Recorder';

import ProfileLoop from "../../components/ProfileLoop";
import { startedCapturing, doneCapturing, upload, cancelled } from '../../modules/User/Loop/actions';
import styles from "./styles";
import colors from '../../core/style/colors';

@connect(state => ({profileLoop: state.userloop}))
@reactMixin.decorate(reactTimerMixin)
export default class ShootNewProfileLoop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recorderDevice: 'front',
      recordProgressBarWidth: new Animated.Value(0)
    };

    this.recordProgressBarAnimation = Animated.timing(
      this.state.recordProgressBarWidth, {
        toValue: Dimensions.get('window').width,
        duration: 2000
      }
    );
  }

  render() {
    return (
      <View style={styles.shootNewProfileLoop}>
        <StatusBar hidden={true} />

        {this._renderCameraOrProfileLoop()}

        {this._renderBackButton()}

        {this._renderRecorderDeviceSwitchButton()}
      </View>
    );
  }

  _renderCameraOrProfileLoop() {
    if (['WAITING', 'CAPTURING'].indexOf(this.props.profileLoop.status) !== -1) {
      return (
        <Recorder
          ref={recorder => {
            if (!this.recorder) {
              this.recorder = recorder;
            }
          }}
          device={this.state.recorderDevice}
          containerStyle={styles.recorderContainer}
        >
          <View style={styles.recorderProgressBar}>
            <Animated.View style={[styles.recorderProgressBarInner, {width: this.state.recordProgressBarWidth}]} />
          </View>

          <View style={styles.actionButtons}>
            {this._renderActionButtons()}
          </View>
        </Recorder>
      );
    } else {
      return (
        <ProfileLoop
          video={this.props.profileLoop.file}
          repeat={true}
          containerStyle={styles.profileLoop}
        >
          <View style={styles.actionButtons}>
            {this._renderActionButtons()}
          </View>
        </ProfileLoop>
      );
    }
  }

  _renderBackButton() {
    if (this.props.profileLoop.status === 'WAITING') {
      return (
        <TouchableOpacity onPress={() => this._goBack()} activeOpacity={0.8} style={styles.backButton}>
          <Icon name="keyboard-backspace" style={styles.backButtonIcon} />
        </TouchableOpacity>
      );
    }
  }

  _renderRecorderDeviceSwitchButton() {
    if (this.props.profileLoop.status === 'WAITING') {
      let iconName = 'camera-front';

      if (this.state.recorderDevice === 'front') {
        iconName = 'camera-rear';
      }

      return (
        <TouchableOpacity style={styles.recorderDeviceSwitchButton} onPress={() => this._switchRecorderDevice()}>
          <Icon name={iconName} style={styles.recorderDeviceSwitchButtonIcon} />
        </TouchableOpacity>
      );
    }
  }

  _renderActionButtons() {
    if (this.props.profileLoop.status === 'WAITING') {
      return this._renderCaptureButton();
    }

    if (this.props.profileLoop.status === 'PREVIEWING') {
      return this._renderPreviewButtons();
    }

    if (this.props.profileLoop.status === 'UPLOADING') {
      return this._renderUploadIndicator();
    }
  }

  _renderCaptureButton() {
    return (
      <View style={styles.captureButtonContainer}>
        <TouchableOpacity onPress={() => this._startRecording()}>
          <View style={styles.captureButton}>
            <View style={styles.captureButtonInner} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _renderPreviewButtons() {
    return (
      <View style={styles.previewButtonsContainer}>
        <TouchableOpacity onPress={() => this._reset()} style={styles.previewButton}>
          <Icon name="refresh" style={styles.previewButtonIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.dispatch(upload())} style={styles.previewButton}>
          <Icon name="check" style={styles.previewButtonIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  _renderUploadIndicator() {
    return (
      <ActivityIndicator size="large" color={colors.primaryAlt} />
    );
    // return (
    //   <View style={styles.uploadIndicator}>
    //     <Text>Uploading... ({this.props.profileLoop.progress}%)</Text>
    //   </View>
    // );
  }

  _switchRecorderDevice() {
    let recorderDevice = 'front';

    if (this.state.recorderDevice === 'front') {
      recorderDevice = 'back';
    }

    this.setState({
      recorderDevice: recorderDevice
    });
  }

  _startRecording() {
    this.props.dispatch(startedCapturing());

    this.recorder.record();

    this.recordProgressBarAnimation.start(() => {
      this.recorder.pause();

      this.recorder.save((error, url) => {
        if (error) {
          console.log(error);
        } else {
          console.log(url);
          this.props.dispatch(doneCapturing(url));
        }
      });
    });
  }

  _reset() {
    console.log(this);
    this.state.recordProgressBarWidth.setValue(0);

    this.recorder.removeAllSegments();

    this.props.dispatch(cancelled());
  }

  _goBack() {
    Actions.pop();
  }
}
