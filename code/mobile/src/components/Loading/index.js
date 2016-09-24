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

    this.state = {
      opacity: new Animated.Value(1)
    };
  }

  componentDidMount() {
    const animations = {
      fadeOut: Animated.timing(this.state.opacity, {
        toValue: 0
      }),
      fadeIn: Animated.timing(this.state.opacity, {
        toValue: 1
      })
    };

    this.state.opacity.addListener(animatedValue => {
      if (animatedValue.value === 0) {
        animations.fadeOut.stop();

        animations.fadeIn.start();
      }

      if (animatedValue.value === 1) {
        animations.fadeIn.stop();

        animations.fadeOut.start();
      }
    });

    animations.fadeOut.start();
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
