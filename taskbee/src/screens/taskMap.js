import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  NativeModules,
  ScrollView,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {
  TabNavigator,
} from 'react-navigation';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import config from '../config/config';
import Icon from '../components/icon';

MapboxGL.setAccessToken(config.mapboxPublicKey);

/*
* The map view of tasks
*/
class TaskMap extends Component{
  constructor(props){
    super(props);

    this.state = {
      timestamp: 0,
      latitude: 0.0,
      longitude: 0.0,
      altitude: 0.0,
    }

    this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
  }

  onUserLocationUpdate(location) {
    this.setState({
      timestamp: location.timestamp,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
    });
  }

  render(){
    return (
      <View style={{flex:1}}>
        <MapboxGL.MapView
            zoomLevel={15}
            centerCoordinate={[this.state.longitude, this.state.latitude]}
            style={{flex: 1}}
            styleURL={MapboxGL.StyleURL.Street}
            rotateEnabled={true}
            scrollEnabled={true}
            showsUserLocation={true}
            logoEnabled={false}
            userTrackingMode={MapboxGL.UserTrackingModes.Follow}
            onUserLocationUpdate={this.onUserLocationUpdate}
          />
          <View>
            <Text>Timestamp: {this.state.timestamp}</Text>
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
            <Text>Altitude: {this.state.altitude}</Text>
          </View>
      </View>
    );
  }
}

export default TaskMap;
