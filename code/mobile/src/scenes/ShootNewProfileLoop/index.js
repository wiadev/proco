import React from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import reactMixin from 'react-mixin';
import reactTimerMixin from 'react-timer-mixin';
import {Actions} from 'react-native-router-flux';

import ProfileLoop from '../../components/ProfileLoop';
import profileLoopConfig from '../../core/config/profileLoop';
import styles from './styles';


@reactMixin.decorate(reactTimerMixin)
export default class ShootNewProfileLoop extends React.Component {
  constructor() {
    super();

    this.statuses = {
      waiting: 'WAITING',
      capturing: 'CAPTURING',
      done: 'DONE'
    };

    this.state = {
      status: this.statuses.waiting,
      photos: []
    };
  }

  render() {
    return (
      <View style={styles.shootNewProfileLoop}>
        {this._renderCameraOrProfileLoop()}
      </View>
    );
  }

  _renderCameraOrProfileLoop() {
    if (this.state.status === this.statuses.done) {
      return (
        <ProfileLoop isMounted={true} local={true} continuous={true} photos={this.state.photos} style={styles.profileLoop}>
          {this._renderButtons()}
        </ProfileLoop>
      );
    } else {
      return (
        <Camera ref="camera" type="front" aspect="fill" orientation="portrait" captureTarget={Camera.constants.CaptureTarget.temp} keepAwake={true} style={styles.camera}>
          {this._renderButtons()}
        </Camera>
      )
    }
  }

  _renderButtons() {
    const captureButton = () => {
      // This button should be rendered when capturing hasn't been done yet.
      if (this.state.status === this.statuses.waiting) {
        return (
          <TouchableOpacity onPress={() => this._capture()}>
            <View style={styles.captureButton}>
              <View style={styles.captureButtonInner} />
            </View>
          </TouchableOpacity>
        );
      }
    };

    const doneButton = () => {
      // This button should be rendered only after capturing is done.
      if (this.state.status === this.statuses.done) {
        return (
          <TouchableOpacity onPress={() => this._done()}>
            <View style={styles.secondaryButton}>
              <Icon name="check" size={24} style={styles.secondaryButtonIcon} />
            </View>
          </TouchableOpacity>
        );
      } else {
        // Render an empty and transparent View at same size as secondaryButton to align other buttons correctly.
        return (
          <View style={[styles.secondaryButton, {backgroundColor: 'transparent'}]} />
        );
      }
    };

    return (
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => this._cancel()}>
          <View style={styles.secondaryButton}>
            <Icon name="close" size={24} style={styles.secondaryButtonIcon} />
          </View>
        </TouchableOpacity>

        {captureButton()}

        {doneButton()}
      </View>
    );
  }

  _cancel() {
    // Triggered when user cancels the capturing, should go to previous scene.
    Actions.pop();
  }

  _done() {
    // Triggered when capturing is complete. Captured photos are available in this.state.photos.
  }

  _capture() {
    let i = 0;

    this.setState({
      status: this.statuses.capturing
    });

    let captureLoop = this.setInterval(() => {
      if (i < profileLoopConfig.numberOfFrames) {
        this.refs.camera.capture()
          .then(data => {
            let photos = this.state.photos.slice();

            photos.push(data.path);

            this.setState({
              photos: photos
            });
          });
        i++;
      } else {
        // Stop the capturing interval function.
        this.clearInterval(captureLoop);

        this.setState({
          status: this.statuses.done
        });
      }
    }, profileLoopConfig.frameGap);
  }
}
