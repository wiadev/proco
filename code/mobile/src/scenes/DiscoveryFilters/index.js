import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
  PixelRatio,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Picker from 'react-native-picker';
import {
  MKRangeSlider,
  MKRadioButton,
  setTheme,
} from 'react-native-material-kit';
import { round } from 'lodash';
import { getCorrectFontSizeForScreen } from '../../core/functions';
import styles from './styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

setTheme({
  radioStyle: {
    fillColor: 'rgb(249,54,95)',
    borderOnColor: 'rgb(215,215,215)',
    borderOffColor: 'rgb(215,215,215)',
  },
});

@connect(
  state => ({
    discoveryFilters: state.discoveryFilters,
  }),
)
class DiscoveryFilters extends Component {

  constructor(props) {
    super(props);
    this.groupRdSchool = new MKRadioButton.Group();
    this.state = this.props.discoveryFilters.toJS();
  }

  state = {};

  componentDidMount() {

  }

  onPressBottomLeft() {
    Actions.pop();
  }

  onSave() {
    this.props.dispatch(saveDiscoverySettings(this.state));
    Actions.pop();
  }

  render() {
    return (
      <View style={styles.preview}>
        <StatusBar barStyle="default" />
        <ScrollView style={styles.container}>
          <View style={styles.inputBox}>
            <View style={styles.inputBoxLeft}>
              <Text style={styles.pinkText}>Show these genders</Text>
            </View>
            <View style={styles.inputBoxRight}>
              <Text
                style={[styles.blackText, { marginRight: 10, marginRight: 40 }]}
                onPress={() => { this.picker.toggle(); }}
              >{this.state.gender}</Text>
              <Icon
                name="angle-right"
                size={32}
                color="rgba(0, 0, 0, 0.3)"
                style={{
                  left: -28
                }}
              />
            </View>
          </View>
          <View style={[styles.inputBox, {
            flexDirection: 'column',
          }]}>
            <View style={{
              flex: 0,
              width: width - 28,
              flexDirection: 'row',
            }}>
              <View style={styles.inputBoxLeft}>
                <Text style={[styles.pinkText, { marginBottom: 10 }]}>Age Limit</Text>
              </View>
              <View style={styles.inputBoxRight}>
                <Text style={[styles.pinkText, { marginBottom: 10, marginRight: 30, }]}>{this.state.ageMin} - {this.state.ageMax}</Text>
              </View>
            </View>
            <View style={{
              flex: 0,
              width: width - 28,
            }}>
              <MKRangeSlider
                ref="sliderWithRange"
                min={16}
                max={80}
                minValue={this.state.ageMin}
                maxValue={this.state.ageMax}
                step={1}
                lowerTrackColor={'rgb(249,59,95)'}
                onChange={(curValue) => this.setState({
                  ageMin: round(curValue.min),
                  ageMax: round(curValue.max),
                })
                }
              />
            </View>
          </View>
          <View style={[styles.inputBox, {
            flexDirection: 'column',
            alignItems: 'flex-start',
          }]}>
            <Text style={[styles.pinkText, { marginBottom: 10 }]}>School</Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <MKRadioButton
                checked={this.state.onlyFromSchool}
                group={this.groupRdSchool}
              />
              <Text style={[styles.blackText, { fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 12) }]} onPress={() => {
                this.setState({
                  onlyFromSchool: true,
                });
              }}>Only show people from my university</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <MKRadioButton
                checked={!this.state.onlyFromSchool}
                group={this.groupRdSchool}
              />
              <Text style={[styles.blackText, { fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 12) }]} onPress={() => {
                this.setState({
                  onlyFromSchool: false,
                });
              }}>Show people from other universites too</Text>
            </View>
          </View>
        </ScrollView>
        <Picker
          ref={picker => this.picker = picker}
          style={{
            height: 250,
            width,
            left: 0,
            position: 'absolute',
            bottom: 0,
          }}
          showDuration={200}
          showMask={true}
          pickerData={['Male', 'Female']}
          selectedValue={'Male'}
          onPickerDone={(e) => {
            this.setState({
              gender: e[0],
            });
          }}
        />
      </View>
    );
  }
}

export default DiscoveryFilters;
