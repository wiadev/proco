import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
} from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import Text from '../../components/Text';
import Header from '../../components/Header';
import Field from '../../components/Field';
import { trigger as poolTrigger } from '../../modules/Pool/actions';
import { update } from '../../modules/User/actions';
import styles from './styles';

const genderChoices = [
  {
    label: "Female",
    value: 'female'
  },
  {
    label: "Male",
    value: 'male'
  },
  {
    label: "Both",
    value: 'both'
  }
];

@connect(state => ({filters: state.api.data.userFilters}))
export default class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: null
    };
  }

  componentWillMount() {
    this.setState({
      filters: Object.assign({}, _.omit(this.props.filters, 'isLoaded'))
    });
  }

  render() {
    return (
      <View style={styles.discoveryFilters}>
        <Header theme="light" title="Discovery Filters" rightActorType="text" rightActor="Done" rightAction={() => this._done()} />

        <ScrollView>
          <View style={styles.group}>
            <Text style={styles.sectionTitle}>Show me</Text>

            {genderChoices.map((choice, key) => {
              return (
                <Field
                  key={key}
                  type="choice"
                  legend={choice.label}
                  value={this.state.filters.gender === choice.value}
                  onPress={() => this._updateFilter('gender', choice.value)}
                  stickToPrevious={key !== 0}
                />
              );
            })}
          </View>

          <View style={styles.group}>
            <Field
              type="range"
              legend="Age limits"
              value={[this.state.filters.age_min, this.state.filters.age_max]}
              minValue={18}
              maxValue={45}
              onChange={newValue => this._updateFilter('ageLimits', newValue)}
            />
          </View>

          <View style={styles.group}>
            <Field type="bool" legend="People only from my university" value={this.state.filters.only_from_network} onChange={newValue => this._updateFilter('only_from_network', newValue)} />
          </View>
        </ScrollView>
      </View>
    )
  }

  _updateFilter(name, value) {
    if (name === 'ageLimits') {
      this.setState({
        filters: Object.assign({}, this.state.filters, {
          age_min: value[0],
          age_max: value[1]
        })
      })
    } else {
      this.setState({
        filters: Object.assign({}, this.state.filters, {
          [name]: value
        })
      });
    }
  }

  _done() {
    this.props.dispatch(update('filters', this.state.filters));
    this.props.dispatch(poolTrigger(true));

    Actions.pop();
  }
}
