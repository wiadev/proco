import React, {Component} from 'react';
import {
  Image,
  View,
} from 'react-native';

import styles from './styles';

export default class FacebookProfilePhoto extends Component {

  getPhotoURL(fid) {
    return `https://graph.facebook.com/v2.7/${this.props.fid}/picture?type=large`;
  }

  componentWillMount() {
    Image.prefetch(this.getPhotoURL());
  }

  render() {
    return (
      <View style={styles.avatar}>
        <Image style={styles.avatarImage} source={{uri: this.getPhotoURL()}}/>
      </View>
    );
  }
}
