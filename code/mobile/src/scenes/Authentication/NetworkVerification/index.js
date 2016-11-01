import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  View
} from 'react-native';

import Swiper from "react-native-swiper";

import Text from '../../../components/Text';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';

import styles from "../styles";

@connect(
  state => ({
    user: state.user,
  }),
)
class NetworkVerification extends React.Component {

  state = {
    isChecking: true,
  };


  _renderSteps() {
      return (
        <Swiper
          loop={false}
          scrollEnabled={true}
        >
          
         {this._renderStep1()}
         {this._renderStep2()}
        </Swiper>
      );
  }

  _renderStep1() {
    return (
          <View style={styles.swiperSlide}>
              <Text style={{textAlign: 'center', fontWeight: '500'}}>University verification</Text>
      </View>
    );
  }

  _renderStep2() {
    return (
          <View style={styles.swiperSlide}>
              <Text style={{textAlign: 'center', fontWeight: '500'}}>University verification</Text>
      </View>
    );
  }


  render() {

    return (<Modal ref="modal" isOpen={true} height={0.8}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
              <Text style={{marginBottom: 10, textAlign: 'center', fontWeight: '500'}}>University verification</Text>
            </View>

       <View
                onLayout={event => this.setState({swiperHeight: event.nativeEvent.layout.height})}>
            {this._renderSteps()}
          </View>


            <Button type="text" text="Send verification link" highlight={true} onPress={() => this.refs.modal.close()} />
          </View>
        </Modal>);
    return (<Card
        label="One last step!"
        text={`We've just sent a link to ${this.props.user.email}. You can click the link on any device to verify your university email.`}
        buttons={[
          {
            text: "Resend",
            onPress: () => this.props.dispatch(updateNetworkEmail(this.props.user.email))
          },
          {
            text: "Logout",
            onPress: () => this.props.dispatch(logout())
          },
        ]}
        noClose={this.state.isChecking}
        activityIndicator={this.state.isChecking}
      />
    );
  }
}

export default NetworkVerification;
