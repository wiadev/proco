import React from 'react';
import {
  View,
  Image
} from 'react-native';
import reactMixin from 'react-mixin';
import reactTimerMixin from 'react-timer-mixin';

import profileLoopConfig from '../../core/config/profileLoop';
import styles from './styles';

const propTypes = {
  isMounted: React.PropTypes.bool,
  photos: React.PropTypes.array.isRequired,
  photoOpacity: React.PropTypes.number,
  local: React.PropTypes.bool,
  continuous: React.PropTypes.bool,
  style: React.PropTypes.any,
  containerStyle: React.PropTypes.any
};

const defaultProps = {
  // start - mock data
  photos: [
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest01.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest02.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest03.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest04.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest05.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest06.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest07.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest08.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest09.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest10.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest11.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest12.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest13.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest14.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest15.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest16.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest17.jpg',
    'https://storage.googleapis.com/hello-4c376.appspot.com/looptests/procolooptest18.jpg'
  ],
  // end - mock data
  isMounted: true,
  photoOpacity: 1,
  local: false,
  continuous: false
};

@reactMixin.decorate(reactTimerMixin)
export default class ProfileLoop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      width: 0,
      height: 0,
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
      <View onLayout={event => this._onLayout(event)} style={[styles.profileLoop, this.props.style]}>
        <Image
          source={{isStatic: this.props.local, uri: this.props.photos[this.state.currentFrame]}}
          style={[styles.photo, {width: this.state.width, height: this.state.height, opacity: this.props.photoOpacity}]}
        />

        <View style={[styles.container, this.props.containerStyle]}>
          {this.props.children}
        </View>
      </View>
    );
  }

  _onLayout(event) {
    const layout = event.nativeEvent.layout;

    this.setState({
      width: layout.width,
      height: layout.height
    });
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
    // There is a timeout to prevent running profile loop multiple times.
    this.setTimeout(() => {
      if (!this.state.running) {
        this.setState({
          running: true
        });

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
    }, 200);
  }

  _stop() {
    if (this.state.running) {
      this.clearInterval(this.state.func);

      // Reset to default state in order to be able to run again.
      this.setState({
        running: false,
        currentFrame: 0,
        nextFrameAction: 'increase',
      });
    }
  }
}

ProfileLoop.propTypes = propTypes;
ProfileLoop.defaultProps = defaultProps;