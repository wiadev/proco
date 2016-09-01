import React, {Component} from "react";
import {StyleSheet, Text, View, Dimensions, Image, PixelRatio, StatusBar} from "react-native";
import Swiper from "react-native-swiper";
import {connect} from "react-redux";
import PoolItem from "../../../../components/PoolItem";
import Card from "../../../../components/Card";
import {base} from "../../../../core/Api";
import PermissionModal from "../../../../components/PermissionModal";
import {setStatusBarStyle} from "../../../../modules/StatusBar/actions";
import IconM from "react-native-vector-icons/MaterialIcons";
import {getUserRefForTypeAsString} from "../../../../modules/User/actions";

const onComplete = (eventType, params) => console.log(eventType, params);

@connect(
  state => ({
    uid: state.auth.uid,
    permissions: state.permissions,
  }),
)
export default class Pool extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    index: 0,
    drops: [],
  };

  componentWillMount() {
    console.log("ppp", this.props)
    this.ref = base.syncState(getUserRefForTypeAsString('drops', this.props.uid), {
      context: this,
      state: 'drops',
      asArray: true,
    });

    this.props.dispatch(setStatusBarStyle('default'));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  renderPoolItems(items = this.state.drops) {
    if (items.length < 1) {
      return (<Card label="No one seems to be nearby" noClose={true}/>);
    }
    return items.map((item, key) => {
      return (<PoolItem key={key} isMounted={key === this.state.index } {...item} />);
    });
  }

  render() {

    return (
      <View>
        <Swiper
          horizontal={true}
          loop={false}
          showsPagination={false}
          onMomentumScrollEnd={(e, state, context) => {
            this.setState({
              index: state.index
            });

            console.log('index:', state.index);
          }}
        >
          {(this.props.permissions.location === 'authorized') ?
            this.renderPoolItems(this.state.drops) : <PermissionModal type="location"/>
          }
        </Swiper>
        <IconM
          name="expand-less"
          size={44}
          color="white"
          style={{
            opacity: 0.5,
            backgroundColor: 'transparent',
            textAlign: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 10,
          }}
        />
      </View>
    );
  }
}
