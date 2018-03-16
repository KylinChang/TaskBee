import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  NativeModules,
} from 'react-native';
// import Mapbox from 'react-native-mapbox-gl';

// const {MapboxGLManager} = NativeModules;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: config.colorBackground,
  }
});

/*
* The map view of tasks
*/
// class TaskMap extends Component{
//   constructor(props){
//     super(props);
//
//     this.state = {
//       region: null
//     }
//   }
//
//   onRegionChange(region) {
//     this.setState({ region });
//   }
//
//   render(){
//     return (
//       <Mapbox/>
//     );
//   }
// }

/*
* Whole picture of the task tab
*/
class Task extends Component{
  render(){
    return (
      <View style={styles.container}>
        {/* <TaskMap/> */}
      </View>
    );
  }
}

export default Task;
