import React from 'react';
import {
  View
} from 'react-native';
import Video from 'react-native-video';

import styles from './styles';

export default class ProfileLoop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
  }

  render() {
    return (
      <View onLayout={event => this._onLayout(event)} style={[styles.profileLoop, this.props.style]}>
        <Video
          source={this._getVideoSource()}
          muted={true}
          resizeMode="cover"
          repeat={this.props.repeat}
          style={[styles.video, {width: this.state.width, height: this.state.height, opacity: this.props.videoOpacity}]}
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

  _getVideoSource() {
    if (this.props.video) {
      return {uri: this.props.video};
    } else {
      return require('../../assets/dummyProfileLoop.mp4');
    }
  }
}

ProfileLoop.propTypes = {
  video: React.PropTypes.any.isRequired,
  videoOpacity: React.PropTypes.number,
  repeat: React.PropTypes.bool,
  style: React.PropTypes.any,
  containerStyle: React.PropTypes.any
};

ProfileLoop.defaultProps = {
  videoOpacity: 1,
  repeat: false
};
