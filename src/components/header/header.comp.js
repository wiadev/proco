import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  header: {
    flex: 0,
    height: 50,
    position: 'relative',
    width,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    top: 20,
  },
  headerLeft: {
    flex: 1,
    width: width * 25 / 100,
    position: 'relative',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  headerMid: {
    flex: 2,
    width: width * 50 / 100,
    position: 'relative',
  },
  headerRight: {
    flex: 1,
    width: width * 25 / 100,
    alignItems: 'flex-end',
    paddingRight: 10,
    position: 'relative',
    justifyContent: 'center',
  },
  logo: {
    flex: 0,
    transform: [{ scale: 0.6 }],
    alignSelf: 'center',
  },
});

class HeaderComp extends Component {

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
    this.styles = styles;
  }

  render() {
    return (
      <View style={this.styles.header}>
        <View style={this.styles.headerLeft}>
          {!this.props.hideLeft ? (
            this.props.leftContainer ? this.props.leftContainer : (
              <IconM
                name={this.props.leftIcon}
                size={34}
                color="rgba(255,255,255,0.8)"
                style={this.styles.leftButtonTextStyle}
                onClick={this.props.leftAction()}
              />
            )
          ) : null}
        </View>
        <View style={this.styles.headerMid}>
          {!this.props.hideMid ? (
            this.props.midContainer ? this.props.midContainer : (
              <Image style={this.styles.logo} source={require('./../../images/logo.png')} />
            )
          ) : null}
        </View>
        <View style={this.styles.headerRight}>
          {!this.props.hideRight ? (
            this.props.rightContainer ? this.props.rightContainer : null
          ) : null}
        </View>
      </View>
    );
  }
}

export default HeaderComp;
