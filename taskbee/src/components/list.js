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
import { GiftedChat } from 'react-native-gifted-chat';
// import {
//   Container,
//   Header,
//   Content,
//   Card,
//   CardItem,
//   Thumbnail,
//   Text,
//   Button,
//   Icon,
//   Left,
//   Body,
// } from 'native-base';

import config from '../config/config';

const styles = StyleSheet.create({
  taskItem: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: config.borderRadius,
    borderWidth: config.borderWidth,
    borderColor: config.colorBorder,
    marginBottom: 9,
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
    backgroundColor: config.colorSubtle,
  },
  taskItemDescription: {
    flex: 1,
    padding: config.normalPadding,
  },
  taskItemImages:{
    flex: 1,
    height: 136,
  },
  spliter: {
    height: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: '#E7E7E7',
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
  },
  textDescription: {
    color: config.colorText,
    marginTop: 3,
    marginBottom: 5,
    fontSize: 18,
  },

  taskImg: {
    width: 100,
    height: 100,
  }
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
        renderItem={({item}) => <Image source={{uri: item.uri}} style={styles.taskImg}/>}
      />
    );
  }

  render(){
    const {
      userImg, username, taskImgs,
      description, title, price
    } = this.props;

    return (
      <View style={styles.taskItem}>

        <View style={styles.taskItemUser}>
          <Image source={{uri: userImg}} style={{width: 36, height: 36, marginLeft: 12}}/>
          <Text style={styles.textUser}>{username}</Text>
        </View>
        <View style={styles.spliter}/>

        <View style={styles.taskItemTitle}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textPrice}>{"$" + price}</Text>
        </View>
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

export {
  TaskItem,
};
