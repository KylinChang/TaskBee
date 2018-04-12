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

class TaskOngoing extends Component{
  constructor(props){
    super(props);
  }

  renderItem = ({item}) => (
    <TaskItem
      taskImgs={[
        item.img_url0,
        item.img_url1,
        item.img_url2,]}
        userImg={item.img_url}
        price={item.price}
        description={item.description}
        username={item.poster_name}
    />
  );

  render(){
    const {underway_task} = this.props;
    console.log(underway_task);
    let data = [];
    for(let i=0; i<underway_task.length; i++){
      let item = underway_task[i];
      data.push({
        img_url: item.img_url,
        img_url0: item.img_url0?{uri: config.DEVURL+item.img_url0}:null,
        img_url1: item.img_url1?{uri: config.DEVURL+item.img_url1}:null,
        img_url2: item.img_url2?{uri: config.DEVURL+item.img_url2}:null,
        price: item.price,
        description: item.description,
        poster_name: item.poster_name,
      });
    }
    console.log("data");
    console.log(data);
    return (
      <View>
        <FlatList
            data={data}
            renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default connect(
    state => ({
      username: state.user.username,
      email: state.user.email,
      underway_task: state.user.underway_task,
    }))(TaskOngoing);
