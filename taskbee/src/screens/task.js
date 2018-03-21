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
import Mapbox from '@mapbox/react-native-mapbox-gl';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import config from '../config/config';
import Icon from '../components/icon';
import {
  AccentFabButton,
  FabButton,
} from '../components/button';

Mapbox.setAccessToken(config.mapboxPublicKey);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabContainer: {
    flex: 1,
    flexDirection: "row",
    position: 'absolute',
    bottom: 10,
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
      region: null
    }
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render(){
    return (
      <View style={{flex:1}}>
        <Mapbox.MapView
            zoomLevel={15}
            centerCoordinate={[11.256, 43.770]}
            style={{flex: 1}}
            styleURL={Mapbox.StyleURL.Street}
          />
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
            <AccentFabButton>
              <FontAwesome>{Icons.map}</FontAwesome>
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

export default Task;
