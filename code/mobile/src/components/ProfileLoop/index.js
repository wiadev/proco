import React from 'react';
import {
  View,
  Image,
  Dimensions
} from 'react-native';
import reactMixin from 'react-mixin';
import reactTimerMixin from 'react-timer-mixin';

import styles from './styles';
const screen = Dimensions.get('window');

@reactMixin.decorate(reactTimerMixin)
export default class ProfileLoop extends React.Component {
  constructor(props) {
    super(props);

    this.factor = 0;
    this.factorOperation = 'plus';

    this.state = {
      factor: 0
    };

    this.setInterval(() => {
      if (this.nextFactorOperation === 'plus') {
        if (this.factor < 4) {
          this._setFactorStuff({
            factor: this.factor + 1
          });
        } else {
          this._setFactorStuff({
            factor: this.factor - 1,
            nextFactorOperation: 'minus'
          });
        }
      } else {
        if (this.state.factor > 0) {
          this._setFactorStuff({
            factor: this.factor - 1
          });
        } else {
          this._setFactorStuff({
            factor: this.factor + 1,
            nextFactorOperation: 'plus'
          });
        }
      }
    }, 100);
  }

  _setFactorStuff(params) {
    this.factor = params.factor;

    this.setState({
      factor: params.factor
    });

    if (params.hasOwnProperty('nextFactorOperation')) {
      this.nextFactorOperation = params.nextFactorOperation;
    }
  }

  render() {
    return (
      <View style={[styles.profileLoop, this.props.style]}>
        <Image
          source={this.props.imageSource}
          style={[styles.image, {
            marginTop: -1 * this.state.factor * screen.height
          }]} />

        <View style={[styles.container, this.props.containerStyle]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

ProfileLoop.propTypes = {
  imageSource: React.PropTypes.any,
  style: React.PropTypes.any,
  containerStyle: React.PropTypes.any
};

ProfileLoop.defaultProps = {
  imageSource: {uri: 'http://images.phhhoto.com/3/IRsBq56727a/jpeg'}
};
