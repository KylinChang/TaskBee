import React, {
  Component,
} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {MKButton, mdl} from 'react-native-material-kit';

import config from '../config/config';

const styles = StyleSheet.create({
  taskItem: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: config.borderRadius,
    borderWidth: config.borderWidth,
    borderColor: config.colorBorder,
    marginBottom: 20,
  },
  taskItemMain: {
    flex: 1,
    flexDirection: 'column',
  },
  taskItemTitle: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: config.normalPadding,
  },
  taskItemUser:{
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#FFF',
  },
  taskItemDescription: {
    flex: 1,
    padding: config.normalPadding,
  },
  taskItemImages:{
    flex: 1,
    height: 108,
  },
  orderItemButtons:{
    flex: 1,
    flexDirection: 'row',
    height: 32,
  },
  spliter: {
    height: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: '#E7E7E7',
  },

  textNormal: {
    fontSize: 18,
  },
  textUser: {
    marginLeft: 9,
    fontSize: 18,
  },
  textTitle:{
    fontSize: 22,
  },
  textPrice: {
    fontSize: 18,
    color: config.colorRed,
    marginRight: 9,
    textAlign: 'right',
  },
  textDescription: {
    color: config.colorText,
    marginBottom: 9,
    fontSize: 18,
  },

  taskImg: {
    width: 100,
    height: 100,
    marginRight: 9,
  },
  buttonChat: {
    backgroundColor: config.colorBlue,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonAppointment: {
    backgroundColor: config.colorPrimary,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

class TaskItem extends Component{
  constructor(props){
    super(props);
  }

  renderImages(taskImgs){
    return (
      <FlatList
        horizontal
        style={styles.taskItemImages}
        data={taskImgs}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        renderItem={({item}) => <Image source={{uri: item.uri}} style={styles.taskImg}/>}
      />
    );
  }

  render(){
    const {
      userImg, username, taskImgs,
      description, price
    } = this.props;

    return (
      <View style={styles.taskItem}>

        <View style={styles.taskItemUser}>
          <Image source={{uri: userImg}} key={new Date()} style={{width: 36, height: 36, marginLeft: 12}}/>
          <Text style={styles.textUser}>{username}</Text>
          <View style={{flex: 1}}>
            <Text style={styles.textPrice}>{"$" + price}</Text>
          </View>
        </View>
        <View style={styles.spliter}/>
        <View style={styles.taskItemDescription}>
          <Text style={styles.textDescription}>{description}</Text>
          {taskImgs && taskImgs.length ?
            this.renderImages(taskImgs)
            : null}
        </View>
        <View style={styles.spliter}/>

      </View>
    );
  }
}

class OrderItem extends Component{
  constructor(props){
    super(props);
  }

  renderImages(taskImgs){
    return (
      <FlatList
        horizontal
        style={styles.taskItemImages}
        data={taskImgs}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        renderItem={({item}) => <Image source={{uri: item.uri}} style={styles.taskImg}/>}
      />
    );
  }
  
  render(){
    const {
      userImg, username, taskImgs,
      description, price, onPressChat, onPressAppointment,
    } = this.props;

    return (
      <View style={styles.taskItem}>

        <View style={styles.taskItemUser}>
          <Image source={{uri: userImg}} key={new Date()} style={{width: 36, height: 36, marginLeft: 12}}/>
          <Text style={styles.textUser}>{username}</Text>
          <View style={{flex: 1}}>
            <Text style={styles.textPrice}>{"$" + price}</Text>
          </View>
        </View>
        <View style={styles.spliter}/>
        <View style={styles.taskItemDescription}>
          <Text style={styles.textDescription}>{description}</Text>
          {taskImgs && taskImgs.length ?
            this.renderImages(taskImgs)
            : null}
        </View>
        <View style={styles.spliter}/>

        <View style={styles.orderItemButtons}>
          <MKButton
            style={styles.buttonChat}
            onPress = {onPressChat}
            >
            <Text pointerEvents="none" style={styles.textNormal}>
                Chat
            </Text>
          </MKButton>
          <MKButton
            style={styles.buttonAppointment}
            onPress = {onPressAppointment}
            >
            <Text pointerEvents="none" style={styles.textNormal}>
              Make Appointment
            </Text>
          </MKButton>
        </View>

      </View>
    );
  }
}

export {
  TaskItem,
  OrderItem,
};
