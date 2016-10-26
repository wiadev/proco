import React from "react";
import { connect } from "react-redux";
import {
  NativeModules,
  StatusBar,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated
} from "react-native";
import Camera from "react-native-camera";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/MaterialIcons";
import reactMixin from "react-mixin";
import reactTimerMixin from "react-timer-mixin";

import ProfileLoop from "../../components/ProfileLoop";
import { startedCapturing, doneCapturing, upload, cancelled } from "../../modules/User/Loop/actions";
import styles from "./styles";
import colors from "../../core/style/colors";

@connect(state => ({profileLoop: state.userloop}))
@reactMixin.decorate(reactTimerMixin)
export default class ShootNewProfileLoop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraType: 'front',
      profileLoop: null,
      sparkleOpacity: new Animated.Value(0)
    };

    this.sparkleCount = 0;
  }

  render() {
    this.state.sparkleOpacity.addListener(animatedValue => {
      if (animatedValue.value === 0.6) {
        this._startSparkleAnimation();
      }
    });

    return (
      <View style={styles.shootNewProfileLoop}>
        <StatusBar hidden={true} />

        {this._renderCameraOrProfileLoop()}

        {this._renderBackButton()}

        {this._renderCameraTypeSwitchButton()}
      </View>
    );
  }

  _startSparkleAnimation() {
    this.setState({
      sparkleOpacity: new Animated.Value(0)
    }, () => {
      if (this.sparkleCount < 5) {
        let animation = Animated.timing(this.state.sparkleOpacity, {
          toValue: 0.6,
          duration: 100
        });

        animation.start();
      }
    });

    this.sparkleCount += 1;
  }

  _renderCameraOrProfileLoop() {
    if (['WAITING', 'CAPTURING'].indexOf(this.props.profileLoop.status) !== -1) {
      return (
        <Camera
          ref="camera"
          captureMode={Camera.constants.CaptureMode.video}
          captureAudio={false}
          captureTarget={Camera.constants.CaptureTarget.temp}
          type={this.state.cameraType}
          style={styles.camera}
        >
          <Animated.View style={[styles.sparkle, {opacity: this.state.sparkleOpacity}]} />

          <View style={styles.actionButtons}>
            {this._renderActionButtons()}
          </View>
        </Camera>
      );
    } else {
      return (
        <ProfileLoop imageSource={{uri: this.state.profileLoop}} isStatic={true}>
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

  _renderCameraTypeSwitchButton() {
    if (this.props.profileLoop.status === 'WAITING') {
      let iconName = 'camera-front';

      if (this.state.cameraType === 'front') {
        iconName = 'camera-rear';
      }

      return (
        <TouchableOpacity style={styles.cameraTypeSwitchButton} onPress={() => this._switchCameraType()}>
          <Icon name={iconName} style={styles.cameraTypeSwitchButtonIcon} />
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

  _switchCameraType() {
    let cameraType = 'front';

    if (this.state.cameraType === 'front') {
      cameraType = 'back';
    }

    this.setState({
      cameraType: cameraType
    });
  }

  _startRecording() {
    this.props.dispatch(startedCapturing());
    this._startSparkleAnimation();

    this.refs.camera.capture()
      .then(data => {
        // We got the video, now we need to generate the jpeg.
        NativeModules.ProcoLoopGenerator.generateLoop(data.path, (error, imagePath) => {
          this.props.dispatch(doneCapturing(imagePath));

          this.setState({
            profileLoop: imagePath
          });
        });
      });

    this.setTimeout(() => {
      this.refs.camera.stopCapture();
    }, 550);
  }

  _reset() {
    this.props.dispatch(cancelled());
  }

  _goBack() {
    Actions.pop();
  }
}
