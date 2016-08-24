import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PixelRatio,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import styles from '../../styles';
import PoolItem from '../../../../components/PoolItem';
import Card from '../../../../components/Card';
import PermissionModal from '../../../../components/PermissionModal';
import {hideStatusBar, showStatusBar, setStatusBarStyle} from '../../../../modules/StatusBar/actions';
import IconM from 'react-native-vector-icons/MaterialIcons';
const sequenceImages = ['https://files.icoz.co/uploads/procolooptest01.jpg',
  'https://files.icoz.co/uploads/procolooptest02.jpg',
  'https://files.icoz.co/uploads/procolooptest03.jpg',
  'https://files.icoz.co/uploads/procolooptest04.jpg',
  'https://files.icoz.co/uploads/procolooptest05.jpg',
  'https://files.icoz.co/uploads/procolooptest06.jpg',
  'https://files.icoz.co/uploads/procolooptest07.jpg',
  'https://files.icoz.co/uploads/procolooptest08.jpg',
  'https://files.icoz.co/uploads/procolooptest09.jpg',
  'https://files.icoz.co/uploads/procolooptest10.jpg',
  'https://files.icoz.co/uploads/procolooptest11.jpg',
  'https://files.icoz.co/uploads/procolooptest12.jpg',
  'https://files.icoz.co/uploads/procolooptest13.jpg',
  'https://files.icoz.co/uploads/procolooptest14.jpg',
  'https://files.icoz.co/uploads/procolooptest15.jpg',
  'https://files.icoz.co/uploads/procolooptest16.jpg',
  'https://files.icoz.co/uploads/procolooptest17.jpg',
  'https://files.icoz.co/uploads/procolooptest18.jpg'];

const onComplete = (eventType, params) => console.log(eventType, params);

@connect(
  state => ({
    permissions: state.permissions,
  }),
)
export default class Pool extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    people: [1,2,3]
  };

  componentDidMount() {

  }

  renderPoolItems(items) {
    if (items.length < 1) {
      return (<Card label="No one seems to be nearby" noClose={true} />);
    }
    return items.map((item, key) => {
      return (<PoolItem key={key} isMounted={key === this.state.index } />);
    });
  }
  render() {

    return (
      <View>
        <Swiper
          horizontal={true}
          loop={false}
          showsPagination={false}
          onMomentumScrollEnd={function(e, state, context){
            console.log('index:', state.index);
          }}
        >
          {(this.props.permissions.location === 'authorized') ?
            this.renderPoolItems(this.state.people) : <PermissionModal type="location" />
          }
        </Swiper>
        <IconM
          name="expand-less"
          size={44}
          color="white"
          style={{ opacity: 0.5,
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
