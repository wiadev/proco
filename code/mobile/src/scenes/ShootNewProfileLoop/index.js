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
import profileLoopConfig from "../../modules/Profiles/Loops/config";
import { startedCapturing, doneCapturing, upload, cancelled } from '../../modules/User/Loop/actions';
import styles from "./styles";
import colors from '../../core/style/colors';

@connect(state => ({profileLoop: state.userloop}))
@reactMixin.decorate(reactTimerMixin)
export default class ShootNewProfileLoop extends React.Component {
  render() {
    return (
      <View style={styles.shootNewProfileLoop}>
        <StatusBar hidden={true} />

        {this._renderCameraOrProfileLoop()}

        {this._renderBackButton()}
      </View>
    );
  }

  _renderCameraOrProfileLoop() {
    if (['WAITING', 'CAPTURING'].indexOf(this.props.profileLoop.status) !== -1) {
      return (
        <Camera
          ref="camera"
          type="front"
          aspect="fill"
          captureAudio={false}
          orientation="portrait"
          captureTarget={Camera.constants.CaptureTarget.temp}
          keepAwake={true}
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
          local={true}
          continuous={true}
          photos={this.props.profileLoop.photos}
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

  _capture() {
    this.props.dispatch(startedCapturing());

    let photos = [];
    let i = 0;

    let captureLoop = this.setInterval(() => {
      if (i < profileLoopConfig.numberOfFrames) {
        this.refs.camera.capture()
          .then(data => photos.push(data.path));
        i++;
      } else {
        // Stop the capturing interval function.
        this.clearInterval(captureLoop);

        this.props.dispatch(doneCapturing(photos));
      }
    }, profileLoopConfig.frameGap);
  }

  _goBack() {
    Actions.pop();
  }
}
