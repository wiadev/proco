import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
  ListView,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MessageCountIcon from '../CountIcon';
import FacebookProfilePhoto from '../../FacebookProfilePhoto';
import Card from '../../Card';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import styles from './styles';

class List extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  onPressBottomLeft() {
    Actions.pop();
  }

  onItemPress() {
    Actions.talkScreen();
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight onPress={::this.onItemPress}>
        <View style={styles.rowItem} onPress={::this.onItemPress}>
          <View style={[styles.rowItemLeft, {
            width: width * 20 / 100,
          }]}>
            <View style={styles.rowItemImage}>
              <FacebookProfilePhoto styles={styles.avatarImage} fid={rowData.fid} size="large" />
            </View>
          </View>
          <View style={[styles.rowItemLeft, {
            width: width * 65 / 100,
          }]}>
            <Text style={styles.rowItemUsername}>{rowData.name}</Text>
            <Text style={styles.rowItemUserTitle}>{rowData['last-message']}</Text>
          </View>
          <View style={styles.rowItemRight}>
            <MessageCountIcon
              messageCount={rowData.unread}
              messageDot={{borderColor: 'white'}}
              textColor={rowData.unread ? 'rgb(249,54,95)' : 'rgb(209,213,217)'}
              textStyles={rowData.unread ? {color: 'white', fontSize: 12, left: -31} : {color: 'transparent'}}
              showEmpty={false}
              size={25}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.preview}>
        <View style={styles.topMenu}>
          <View style={styles.topMenuLeft}>
            <Icon
              name="angle-left"
              size={42}
              color="rgba(0, 0, 0, 0.3)"
              onPress={() => {
                Actions.pop();
              }}
            />
          </View>
          <View style={styles.topMenuMid}>
            <Text style={styles.menuTitle}>Messages</Text>
          </View>
          <View style={styles.topMenuRight}>
            <Text style={styles.btnSave} />
          </View>
        </View>
        <ScrollView>
          {
            (Object.keys(this.props.list).length > 0) ?
              <ListView
                dataSource={this.ds.cloneWithRows(this.props.list)}
                renderRow={::this.renderRow}
                style={styles.listView}
              />
              :
              <Card label="You have no messages" noClose />
          }

        </ScrollView>
      </View>
    );
  }
}

export default List;
