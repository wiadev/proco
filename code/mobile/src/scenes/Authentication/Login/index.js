import React, {Component} from "react";
import {Text, ActivityIndicator, View, Image, TouchableOpacity, ActionSheetIOS} from "react-native";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/FontAwesome";
import {Actions} from "react-native-router-flux";
import {login} from "../../../modules/Authentication/actions";
import {connect} from "react-redux";
import styles from "./styles";

@connect(
  state => ({
    auth: state.auth,
  }),
)
class Login extends Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(props) {
    return (props.auth !== this.props.auth);
  }

  showOptions() {
    ActionSheetIOS.showActionSheetWithOptions({
        options: [
          'Terms of Use',
          'Privacy Policy',
          'Support',
          'Cancel',
        ],
        cancelButtonIndex: 3,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Actions.TermsOfUsage();
            break;
          case 1:
            Actions.PrivacyPolicy();
            break;
          case 2:
            Actions.Support();
            break;
        }
      });
  }

  renderLoginButton() {
    return (
      <View>
        <View style={styles.fbLoginView}>
          <Icon
            name="facebook-official"
            size={26}
            color="#3B5998"
            style={styles.fbLoginIcon}
          />
          <Text style={styles.fbLoginText} onPress={() => this.props.dispatch(login())}>
            Login with Facebook
          </Text>
        </View>
        <TouchableOpacity onPress={::this.showOptions}>
          <Text style={styles.footerText}>
            By continuing you agree to our terms and privacy policy
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderAuthLoading() {
    return (<ActivityIndicator
      style={[styles.centering, {paddingBottom: 75}]}
      size="large"
      color="#ffffff"
    />);
  }

  render() {
    const {uid, isInProgress} = this.props.auth;

    return (
      <View style={styles.container}>
        <Image style={styles.logo} resizeMode="contain" source={require('../../../assets/images/logo.png')}/>
        <Swiper
          style={styles.swiper}
          height={231}
          loop={false}
          dot={<View style={styles.swiperDot}/>}
          activeDot={<View style={styles.swiperActiveDot}><View style={styles.swiperActiveDotChild}/></View>}
          paginationStyle={styles.swiperPagination}
        >
          <View style={styles.swiperText}>
            <Image style={styles.swiperIcon} source={require('../../../assets/images/group.png')}/>
            <Text style={styles.text}>Answer people's questions</Text>
          </View>
          <View style={styles.swiperText}>
            <Image style={styles.swiperIcon} source={require('../../../assets/images/group.png')}/>
            <Text style={styles.text}>Second Text</Text>
          </View>
          <View style={styles.swiperText}>
            <Image style={styles.swiperIcon} source={require('../../../assets/images/group.png')}/>
            <Text style={styles.text}>And third Text</Text>
          </View>
        </Swiper>

        {
          (!isInProgress && !uid) ? ::this.renderLoginButton() : ::this.renderAuthLoading()
        }

      </View>
    );
  }
}

export default Login;
