import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

class Header extends Component {

  static propTypes = {
    leftIcon: React.PropTypes.string,
    leftAction: React.PropTypes.func,
    leftContainer: React.PropTypes.any,
    rightAction: React.PropTypes.func,
    rightContainer: React.PropTypes.any,
    midContainer: React.PropTypes.any,
    hideLeft: React.PropTypes.bool,
    hideMid: React.PropTypes.bool,
    hideRight: React.PropTypes.bool,
  };

  static defaultProps = {
    leftIcon: 'close',
    hideLeft: false,
    hideMid: false,
    hideRight: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {!this.props.hideLeft ? (
            this.props.leftContainer ? this.props.leftContainer : (
              <IconM
                name={this.props.leftIcon}
                size={34}
                color="rgba(255,255,255,0.8)"
                style={this.leftButtonTextStyle}
                onPress={this.props.leftAction}
              />
            )
          ) : null}
        </View>
        <View style={styles.headerMid}>
          {!this.props.hideMid ? (
            this.props.midContainer ? this.props.midContainer : (
              <Image style={styles.logo} resizeMode="contain" source={require('../../assets/images/logomini.png')} />
            )
          ) : null}
        </View>
        <View style={styles.headerRight}>
          {!this.props.hideRight ? (
            this.props.rightContainer ? this.props.rightContainer : null
          ) : null}
        </View>
      </View>
    );
  }
}

export default Header;
