import React from 'react';
import {
  Image,
} from 'react-native';
export const getFacebookProfilePhotoUri = (fid, size = 'large') => `https://graph.facebook.com/v2.7/${fid}/picture?type=${size}`;

const FacebookProfilePhoto = (props) => {
  const { styles = {}, fid, size = 'large' } = props;
  return <Image style={styles} source={{uri: getFacebookProfilePhotoUri(fid, size)}} />;
};

export default FacebookProfilePhoto;
