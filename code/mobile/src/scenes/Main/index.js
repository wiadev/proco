import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Permissions from 'react-native-permissions';

import Container from '../../components/Container';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import UpperMenu from './containers/UpperMenu';
import Pool from './containers/Pool';
import Text from '../../components/Text';
import Button from '../../components/Button';
import styles from './styles';

@connect(state => ({
  locationPermissionStatus: state.location.get('permission_status')
}))
export default class MainScreen extends React.Component {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Swiper horizontal={false} loop={false} showsPagination={false} index={1}>
          <UpperMenu />
          {this._renderPool()}
        </Swiper>

      </Container>
    );
  }

  _renderPool() {
    switch (this.props.locationPermissionStatus) {
      case null:
        return (
          <Loading />
        );
      case 'authorized':
        return <Pool />;
      default:
        return (
          <Modal isOpen={true} backdropPressToClose={false} height={0.8}>
            <View style={styles.modalContent}>
              <Image source={require('../../assets/images/location.png')} style={styles.topImage} />

              <Text style={styles.description}>Since Proco only works in campuses, we need to access your location to verify where you are.</Text>

              <View style={styles.buttonWrapper}>
                <Button type="text" text="Go to Settings" highlight={true} onPress={() => Permissions.openSettings()} />
              </View>
            </View>
          </Modal>
        );
    }
  }
}
