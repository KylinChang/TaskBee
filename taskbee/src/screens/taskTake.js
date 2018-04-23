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

class TaskTake extends Component{
  constructor(props){
    super(props);
  }

  renderItem = ({item}) => (
    <TaskItem
      taskImgs={[
        item.img_url0?{uri: config.DEVURL+item.img_url0}:null,
        item.img_url1?{uri: config.DEVURL+item.img_url1}:null,
        item.img_url2?{uri: config.DEVURL+item.img_url2}:null,]}
        userImg={item.img_url?config.DEVURL+item.img_url:config.defaultAvatar}
        price={item.price}
        description={item.description}
        username={item.poster_name}
    />
  );

  render(){
    console.log(this.props.self_take_task);
    let data = this.props.self_take_task;
    data = data.reverse();
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
      self_take_task: state.user.self_take_task,
    }))(TaskTake);
