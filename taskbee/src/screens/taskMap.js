import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    NativeModules,
    ScrollView,
    Image,
    TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import {chat} from '../reducers/user';
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
let locationDic = {
  akw: [-72.9270326, 41.3130912],
  hgs: [-72.9315171, 41.312309],
  sterling: [-72.9312514, 41.3105215],
  bass: [-72.9294937, 41.3107835]
};

let users = [
  {name: "nancyjjn", email: "nancyjjn@yale.edu", location: locationDic.hgs, image: require('../../assets/zzl.png')},
  {name: "Bob",  email: "Bob@yale.edu", location: locationDic.bass, image: require('../../assets/hp.png')},
  {name: "Alice", email: "Alice@yale.edu", location: locationDic.sterling, image: require('../../assets/zhm.png')}
];


class TaskMap extends Component{
    constructor(props){
        super(props);

        this.state = {
            timestamp: 0,
            latitude: locationDic.akw[1],
            longitude: locationDic.akw[0],
            altitude: 0.0,
            users: users
        }
        this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
        this.pressToMessage = this.pressToMessage.bind(this);
    }

    pressToMessage(username, email) {
      this.props.chat({username: username, email: email, avatar: null});
      console.log(username);
      console.log(email);
      this.props.navigation.navigate('Chat');
    }

    renderAnnotation (counter) {
        const id = `pointAnnotation${counter}`;
        const coordinate = this.state.users[counter].location;

        return (
            <MapboxGL.PointAnnotation
                key={id}
                id={id}
                title='Test'
                coordinate={coordinate}>
                <TouchableHighlight onPress={() =>  this.pressToMessage(this.state.users[counter].name, this.state.users[counter].email)}>
                <Image
                    source={this.state.users[counter].image}
                    style={{
                        flex: 1,
                        resizeMode: 'contain',
                        width: 50,
                        height: 50,
                        borderRadius: 25
                    }}/>
              </TouchableHighlight>
            </MapboxGL.PointAnnotation>
        );
    }

    renderAnnotations () {
        const items = [];

        for (let i = 0; i < this.state.users.length; i++) {
            items.push(this.renderAnnotation(i));
        }

        return items;
    }

    onUserLocationUpdate(location) {
        this.setState({
            timestamp: location.timestamp,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            altitude: location.coords.altitude,
        });
    }

    render () {
        return (
            <View style={{flex: 1}}>
              <MapboxGL.MapView
                  ref={(c) => this._map = c}
                  style={{flex: 1}}
                  zoomLevel={15}
                  showUserLocation={true}
                  userTrackingMode={1}

                  centerCoordinate={[this.state.longitude, this.state.latitude]}
                  styleURL={MapboxGL.StyleURL.Street}
                  rotateEnabled={true}
                  scrollEnabled={true}
                  userTrackingMode={MapboxGL.UserTrackingModes.Follow}
                  onUserLocationUpdate={this.onUserLocationUpdate}>

                  {this.renderAnnotations()}

              </MapboxGL.MapView>
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

export default connect(
    state => ({
    }),
    {
        chat,
    }
)(TaskMap);
