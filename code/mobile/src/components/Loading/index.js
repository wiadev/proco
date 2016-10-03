import React from 'react';
import {
  View,
  Image,
  Animated
} from 'react-native';

import Container from '../Container';
import styles from './styles';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.animations = {};

    this.state = {
      opacity: new Animated.Value(1)
    };
  }

  componentDidMount() {
    this.animations = {
      fadeOut: Animated.timing(this.state.opacity, {
        toValue: 0
      }),
      fadeIn: Animated.timing(this.state.opacity, {
        toValue: 1
      })
    };

    this.state.opacity.addListener(animatedValue => {
      if (animatedValue.value === 0) {
        this.animations.fadeOut.stop();

        this.animations.fadeIn.start();
      }

      if (animatedValue.value === 1) {
        this.animations.fadeIn.stop();

        this.animations.fadeOut.start();
      }
    });

    this.animations.fadeOut.start();
  }

  componentWillUnmount() {
    Object.keys(this.animations).map(animationKey => {
      this.animations[animationKey].stop();
    });
  }

  render() {
    return (
      <Container>
        <Animated.View style={[styles.logoContainer, {opacity: this.state.opacity}]}>
          <View style={styles.logoSideCushion} />

          <Image source={require('../../assets/images/logo-vertical.png')} style={styles.logo} />

          <View style={styles.logoSideCushion} />
        </Animated.View>
      </Container>
    );
  }
}
