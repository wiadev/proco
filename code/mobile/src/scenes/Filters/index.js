import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  PixelRatio,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Picker from 'react-native-picker';
import {
  MKRangeSlider,
  MKRadioButton,
  setTheme,
} from 'react-native-material-kit';
import _ from 'lodash';

import {assign} from "../../core/utils";
import {update} from '../../modules/User/actions';
import Header from '../../components/Header';

import { getCorrectFontSizeForScreen } from '../../core/functions';
import appStyles from '../../core/style';
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

@connect(state => ({auth: state.auth, filters: state.api.data.userFilters}))
class DiscoveryFilters extends React.Component {
  constructor(props) {
    super(props);

    this.groupRdSchool = new MKRadioButton.Group();

    this.state = {
      filters: null
    }
  }

  componentWillMount() {
    this.setState({
      filters: assign(_.omit(this.props.filters, 'isLoaded'))
    });
  }

  render() {
    return (
      <View style={appStyles.container}>
        <Header theme="light" title="Discovery Filters" rightActorType="text" rightActor="Done" rightAction={() => this._done()} />

        <ScrollView style={styles.container}>
          <View style={styles.inputBox}>
            <View style={styles.inputBoxLeft}>
              <Text style={styles.pinkText}>Show these genders</Text>
            </View>
            <View style={styles.inputBoxRight}>
              <Text
                style={[styles.blackText, {marginRight: 40}]}
                onPress={() => { this.picker.toggle(); }}
              >{this.state.filters.gender}</Text>
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
                <Text style={[styles.pinkText, { marginBottom: 10, marginRight: 30, }]}>{this.state.filters.age_min} - {this.state.filters.age_max}</Text>
              </View>
            </View>
            <View style={{
              flex: 0,
              width: width - 28,
            }}>
              <MKRangeSlider
                ref="sliderWithRange"
                min={18}
                max={45}
                minValue={this.state.filters.age_min}
                maxValue={this.state.filters.age_max}
                step={1}
                lowerTrackColor={'rgb(249,59,95)'}
                onChange={(curValue) =>
                  this.setState({filters: assign(this.state.filters, {
                    age_min: _.round(curValue.min),
                    age_max: _.round(curValue.max),
                  })})
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
                checked={this.state.filters.only_from_network}
                group={this.groupRdSchool}
              />
              <Text style={[styles.blackText, { fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 12) }]} onPress={() => {

                this.setState({filters: assign(this.state.filters, {
                  only_from_network: true,
                })});
              }}>Only show people from my university</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <MKRadioButton
                checked={!this.state.filters.only_from_network}
                group={this.groupRdSchool}
              />
              <Text style={[styles.blackText, { fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 12) }]} onPress={() => {
                this.setState({_filters: assign(this.state._filters, {
                  only_from_network: false,
                })});
              }}>Show people from other universities too</Text>
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
          pickerData={['Male', 'Female', 'Both']}
          selectedValue={'Both'}
          onPickerDone={(e) => this.setState({filters: assign(this.state.filters, {
            gender: e[0].toLowerCase(),
          })})}
        />
      </View>
    );
  }

  _done() {
    this.props.dispatch(update('filters', this.state.filters));

    Actions.pop();
  }
}

export default DiscoveryFilters;
