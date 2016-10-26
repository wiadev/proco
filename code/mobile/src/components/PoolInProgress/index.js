import React from 'react';
import {
  View,
  Image
} from 'react-native';
import Video from 'react-native-video'

import Container from '../Container';
import Text from '../Text';
import styles from './styles';

export default class PoolInProgress extends React.Component {
  render() {
    return (
      <Container solidBackground={true}>
        <View style={styles.beforeVideo}>
          <View style={styles.beforeVideoContentSideCushion} />

          <View style={styles.beforeVideoContent}>
            <Text style={styles.title}>Searching...</Text>

            <Text style={styles.description}>Hold on, finding awesome people near you</Text>
          </View>

          <View style={styles.beforeVideoContentSideCushion} />
        </View>

        <Video
          source={require('../../assets/videos/pool_in_progress.mp4')}
          repeat={true}
          style={styles.video}
        />

        <View style={styles.afterVideo}>
          <View style={styles.logoSideCushion} />

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
          </View>

          <View style={styles.logoSideCushion} />
        </View>
      </Container>
    );
  }
}
