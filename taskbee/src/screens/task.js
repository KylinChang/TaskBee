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
import {task,} from '../reducers/user';
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

const itemUsername = "jjjj";
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

class TaskPost extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <ScrollView>
        <TaskItem
          userImg={'https://facebook.github.io/react-native/docs/assets/favicon.png'}
          price={30}
          title={"mama"}
          username={"cool"}
        />

        <ChatButton
          imgUri={'https://facebook.github.io/react-native/docs/assets/favicon.png'}
          username={"lala"}
          email={"lala@gmail.com"}
        />
      </ScrollView>
    );
  }
}

class TaskUnderway extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View>

      </View>
    );
  }
}

class TaskTake extends Component{
  constructor(props){
    super(props);
  }

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
    TaskUnderway: {
      screen: TaskUnderway,
      navigationOptions: {
        title: 'Underway',
      },
    },
    TaskPost: {
      screen: TaskPost,
      navigationOptions: {
        title: 'Post',
      },
    },
    TaskTake: {
      screen: TaskTake,
      navigationOptions: {
        title: 'Take',
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
        var forumList = JSON.parse(xhr.responseText).forumList; // array
        thisSave.setState({forumList});
      }
    };
    xhr.open('POST', 'http://172.26.110.5:3000/get_self_task');
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
    }),
    {
      task,
    })(Task);
