/*
 * GoogleMap hover example
 */
import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';

import GoogleMap from 'google-map-react';

import { GOOGLE_MAPS_API_KEY } from '../../helpers/config';

import MyGreatPlaceWithControllableHover from './hover';

import {K_SIZE} from './hoverStyles';

require('./style.css');

class MapView extends Component {
  static propTypes = {
    center: PropTypes.array, // @controllable
    zoom: PropTypes.number, // @controllable
    hoverKey: PropTypes.string, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn

    greatPlaces: PropTypes.array
  };

  static defaultProps = {
    center: [59.838043, 30.337157],
    zoom: 9,
    greatPlaces: [
      {id: 'Afdgdfgdfgdf', lat: 59.955413, lng: 30.337844},
      {id: 'B', lat: 59.724, lng: 30.080}
    ]
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  _onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
    this.props.onCenterChange(center);
    this.props.onZoomChange(zoom);
  }

  _onChildClick = (key, childProps) => {
    this.props.onCenterChange([childProps.lat, childProps.lng]);
  }

  _onChildMouseEnter = (key /*, childProps */) => {
    this.props.onHoverKeyChange(key);
  }

  _onChildMouseLeave = (/* key, childProps */) => {
    this.props.onHoverKeyChange(null);
  }

  _onClick = ({x, y, lat, lng, event}) => console.log(x, y, lat, lng, event)

  render() {
    const places = this.props.greatPlaces
      .map(place => {
        const {id, ...coords} = place;

        return (
          <MyGreatPlaceWithControllableHover
            key={id}
            {...coords}
            text={id}
            // use your hover state (from store, react-controllables etc...)
            hover={this.props.hoverKey === id} />
        );
      });

    return (
    <div id="mapView">
       <GoogleMap
        apiKey={GOOGLE_MAPS_API_KEY}
        center={this.props.center}
        zoom={this.props.zoom}
        hoverDistance={K_SIZE / 2}
        onBoundsChange={this._onBoundsChange}
        onChildClick={this._onChildClick}
        onChildMouseEnter={this._onChildMouseEnter}
        onChildMouseLeave={this._onChildMouseLeave}
        onClick={this._onClick}
        >
        {places}
      </GoogleMap></div>
    );
  }
}

export default controllable(MapView, ['center', 'zoom', 'hoverKey', 'clickKey']);
