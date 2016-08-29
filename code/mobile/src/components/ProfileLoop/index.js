import React from 'react';
import {
  Image
} from 'react-native';
import reactMixin from 'react-mixin';
import reactTimerMixin from 'react-timer-mixin';

import profileLoopConfig from '../../core/config/profileLoop';
import styles from './styles';

@reactMixin.decorate(reactTimerMixin)
export default class ProfileLoop extends React.Component {
  static propTypes = {
    isMounted: React.PropTypes.bool.isRequired,
    photos: React.PropTypes.array.isRequired,
    local: React.PropTypes.bool,
    continuous: React.PropTypes.bool,
    style: React.PropTypes.any
  };

  static defaultProps = {
    local: false,
    continuous: false,
    style: null
  };

  constructor() {
    super();

    this.state = this.initialState();
  }

  initialState() {
    return {
      func: null,
      currentFrame: 0,
      nextFrameAction: 'increase', // ['increase' | 'decrease']
    };
  }

  componentDidMount() {
    this._startOrStopAccordingToIsMounted(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._startOrStopAccordingToIsMounted(nextProps);
  }

  componentWillUnmount() {
    this._stop();
  }

  render() {
    return (
      <Image source={{isStatic: this.props.local, uri: this.props.photos[this.state.currentFrame]}} style={[styles.profileLoop, this.props.style]}>
        {this.props.children}
      </Image>
    );
  }

  // Batuhan loves long, self-explanatory function names, so let's give him some.
  _startOrStopAccordingToIsMounted(props) {
    if (props.isMounted) {
      this._start()
    } else {
      this._stop();
    }
  }

  _start() {
    if (!this._isRunning()) {
      let photoSequence = this.setInterval(() => {
        let newState = {};

        if (this.state.nextFrameAction === 'increase') {
          if (this.state.currentFrame === profileLoopConfig.numberOfFrames - 1) {
            newState.nextFrameAction = 'decrease';
            newState.currentFrame = this.state.currentFrame - 1;
          } else {
            newState.currentFrame = this.state.currentFrame + 1;
          }
        }

        if (this.state.nextFrameAction === 'decrease') {
          if (this.state.currentFrame === 0) {
            if (this.props.continuous) {
              newState.nextFrameAction = 'increase';
              newState.currentFrame = this.state.currentFrame + 1;
            } else {
              this._stop();
            }
          } else {
            newState.currentFrame = this.state.currentFrame - 1;
          }
        }
        this.setState(newState);
      }, profileLoopConfig.frameGap);

      this.setState({
        func: photoSequence
      });
    }
  }

  _stop() {
    if (this._isRunning()) {
      this.clearInterval(this.state.func);

      // Reset to default state in order to be able to run again.
      this.setState(this.initialState());
    }
  }

  _isRunning() {
    return this.state.func !== null;
  }
}
