import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  NativeModules,
  Image,
} from 'react-native';
import {
  TabNavigator,
} from 'react-navigation';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import config from '../config/config';
import Icon from '../components/icon';
import {
  AccentFabButton,
  FabButton,
} from '../components/button';

MapboxGL.setAccessToken(config.mapboxPublicKey);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colorBackground,
  },
  fabContainer: {
    flex: 1,
    flexDirection: "row",
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  fabCol:{
    marginLeft: 10, marginRight: 10,
  },
});

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


class TaskPost extends Component{
  render(){
    return (
      <View>

      </View>
    );
  }
}

class TaskUnderway extends Component{
  render(){
    return (
      <View>

      </View>
    );
  }
}

class TaskHistory extends Component{
  render(){
    return (
      <View>

      </View>
    );
  }
}

/*
* Whole picture of the task tab
*/
const TaskTabs = TabNavigator(
  {
    TaskPost: {
      screen: TaskPost,
      navigationOptions: {
        title: 'Post',
      },
    },
    TaskUnderway: {
      screen: TaskUnderway,
      navigationOptions: {
        title: 'Underway',
      },
    },
    TaskHistory: {
      screen: TaskHistory,
      navigationOptions: {
        title: 'History',
      },
    },
  },
  {
    ...TabNavigator.Presets.AndroidTopTabs,
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: false,
      activeTintColor: config.colorPrimary,
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: '#353539',
      activeBackgroundColor: '#353539',
      style:{
        backgroundColor: '#353539',
      },
      indicatorStyle: {
        borderBottomColor: config.colorPrimary,
        borderBottomWidth: 4,
      },
      labelStyle: {
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      }
    }
  }
);

class Task extends Component{
  render(){
    return(
      <View style={styles.container}>
        <TaskTabs />
        <View style={styles.fabContainer}>
          <View style={styles.fabCol}>
            <AccentFabButton onPress={() => this.props.navigation.navigate('TaskMap')}>
              <FontAwesome>{Icons.mapO}</FontAwesome>
            </AccentFabButton>
          </View>
          <View style={styles.fabCol}>
            <FabButton>
              <Image pointerEvents="none" source={require('../../assets/plus_white.png')}/>
            </FabButton>
          </View>
        </View>
      </View>
    );
  }
}

export {
  Task,
  TaskMap,
};
