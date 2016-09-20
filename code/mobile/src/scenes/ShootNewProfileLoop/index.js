import React from "react";
import { connect } from "react-redux";
import {
  StatusBar,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/MaterialIcons";
import Camera from "react-native-camera";
import reactMixin from "react-mixin";
import reactTimerMixin from "react-timer-mixin";

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
      cameraType: 'front'
    };
  }

  render() {
    return (
      <View style={styles.shootNewProfileLoop}>
        <StatusBar hidden={true} />

        {this._renderCameraOrProfileLoop()}

        {this._renderBackButton()}

        {this._renderCameraSwitchButton()}
      </View>
    );
  }

  _renderCameraOrProfileLoop() {
    if (['WAITING', 'CAPTURING'].indexOf(this.props.profileLoop.status) !== -1) {
      return (
        <Camera
          ref="camera"
          captureMode={Camera.constants.CaptureMode.video}
          type={this.state.cameraType}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.temp}
          captureAudio={false}
          orientation={Camera.constants.Orientation.portrait}
          keepAwake={true}
          playSoundOnCapture={false}
          mirrorImage={true}
          style={styles.camera}
        >
          <View style={styles.actionButtons}>
            {this._renderActionButtons()}
          </View>
        </Camera>
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

  _renderCameraSwitchButton() {
    if (this.props.profileLoop.status === 'WAITING') {
      let iconName = 'camera-front';

      if (this.state.cameraType === 'front') {
        iconName = 'camera-rear';
      }

      return (
        <TouchableOpacity style={styles.cameraSwitchButton} onPress={() => this._switchCameraType()}>
          <Icon name={iconName} style={styles.cameraSwitchButtonIcon} />
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
        <TouchableOpacity onPress={() => this._capture()}>
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
        <TouchableOpacity onPress={() => this.props.dispatch(cancelled())} style={styles.previewButton}>
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
    let newCameraType = 'front';

    if (this.state.cameraType === 'front') {
      newCameraType = 'back';
    }

    this.setState({
      cameraType: newCameraType
    });
  }

  _capture() {
    this.props.dispatch(startedCapturing());

    this.refs.camera.capture({
      target: Camera.constants.CaptureTarget.temp
    })
      .then(videoDetails => this.props.dispatch(doneCapturing(videoDetails.path)));

    this.setTimeout(() => {
      this.refs.camera.stopCapture();
    }, 1000);
  }

  _goBack() {
    Actions.pop();
  }
}
