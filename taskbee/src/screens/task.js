import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  NativeModules,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {
  TabNavigator,
} from 'react-navigation';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import {getTask,} from '../reducers/user';
import TaskPost from './taskPost';
import TaskTake from './taskTake';
import TaskOngoing from './taskOngoing';
import config from '../config/config';
import Icon from '../components/icon';
import {
  AccentFabButton,
  FabButton,
  ChatButton,
} from '../components/button';
import {
  TaskItem,
  OrderItem,
} from '../components/list';

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
* Whole picture of the task tab
*/
const TaskTabs = TabNavigator(
  {
    TaskOngoing: {
      screen: TaskOngoing,
      navigationOptions: {
        title: 'Ongoing',
      },
    },
    TaskPost: {
      screen: TaskPost,
      navigationOptions: {
        title: 'Posted',
      },
    },
    TaskTake: {
      screen: TaskTake,
      navigationOptions: {
        title: 'Taken',
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
  componentWillMount(){
    var xhr = new XMLHttpRequest();
    var thisSave = this;
    var body = new FormData();

    body.append('user_name', this.props.username);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log("get self data!");
        console.log(xhr.responseText);
        var taskList = JSON.parse(xhr.responseText); // array
        thisSave.props.getTask(taskList);
      }
    };
    xhr.open('POST', config.DEVURL + '/get_self_task');
    xhr.send(body);
  }

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
            <FabButton onPress={() => this.props.navigation.navigate('PostTask')}>
              <Image pointerEvents="none" source={require('../../assets/plus_white.png')}/>
            </FabButton>
          </View>
        </View>
      </View>
    );
  }
}



export default connect(
    state => ({
      username: state.user.username,
      email: state.user.email,
    }), {
      getTask,
    }
  )(Task);
