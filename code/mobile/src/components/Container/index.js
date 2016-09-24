import React from 'react';
import {
  View,
  Image
} from 'react-native';

import styles from './styles';

export default class Container extends React.Component {
  render() {
    return (
      <View style={[styles.background, this.props.style]}>
        {this._renderContent()}
      </View>
    );
  }

  _renderContent() {
    if (this.props.solidBackground) {
      return this.props.children;
    } else {
      return (
        <Image source={require('../../assets/images/background.png')} style={styles.backgroundImage}>
          {this.props.children}
        </Image>
      );
    }
  }
}

Container.propTypes = {
  solidBackground: React.PropTypes.bool,
  style: React.PropTypes.any
};

Container.defaultProps = {
  solidBackground: false
};
