import React from 'react';
import {
  Image
} from 'react-native';
import reactMixin from 'react-mixin';
import reactTimerMixin from 'react-timer-mixin';

import styles from './styles';

@reactMixin.decorate(reactTimerMixin)
export default class ProfileImageSequence extends React.Component {
  static propTypes = {
    isMounted: React.PropTypes.bool.isRequired,
    images: React.PropTypes.array.isRequired,
    style: React.PropTypes.any
  };

  static defaultProps = {
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
      <Image source={{uri: this.props.images[this.state.currentFrame]}} style={[styles.profileImageSequence, this.props.style]}>
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
      let imageSequence = this.setInterval(() => {
        let newState = {};

        if (this.state.nextFrameAction === 'increase') {
          if (this.state.currentFrame === 17) {
            newState.nextFrameAction = 'decrease';
            newState.currentFrame = this.state.currentFrame - 1;
          } else {
            newState.currentFrame = this.state.currentFrame + 1;
          }
        }

        if (this.state.nextFrameAction === 'decrease') {
          if (this.state.currentFrame === 0) {
            // newState.nextFrameAction = 'increase';
            // newState.currentFrame = this.state.currentFrame + 1;

            this._stop();
          } else {
            newState.currentFrame = this.state.currentFrame - 1;
          }
        }
        this.setState(newState);
      }, 50);

      this.setState({
        func: imageSequence
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
