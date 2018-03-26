import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {MKButton, mdl} from 'react-native-material-kit';
import ImagePicker from 'react-native-image-crop-picker';
import Calendar from 'react-native-calendar-select';
import MultipleTags from 'react-native-multiple-tags';

import config from '../config/config';
import {postTask,} from '../reducers/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: config.normalPadding,
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: config.normalPadding,
  },

  textInput: {
    flex: 1,
    fontSize: 18,
    height: 200,
    borderWidth:2,
    borderColor: config.colorBorder,
    padding: config.normalPadding,
  },
  textPrice: {
    flex: 1,
    fontSize: 18,
    padding: config.normalPadding,
    borderBottomWidth:2,
    borderBottomColor: config.colorPrimary,
  },

  button: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,.1)',
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.7,
    shadowColor: 'black',
    height: 42,
    borderRadius: 21,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  taskItemImages:{
    flex: 1,
  },
  taskImg: {
    width: 100,
    height: 100,
    marginRight: 9,
  },
});

class PostTask extends Component{
  constructor(props){
    super(props);

    this.state = {
      description: "",
      taskImgs: [],
      startDate: new Date(),
      endDate: new Date(),
      priceText: "",
      price: 0,
      descriptionValid: false,
      priceValid: true,
      tagValid: false,
      hasErr: false,
      tags: [],
    }

    this.onPrice = this.onPrice.bind(this);
    this.onAddPhotos = this.onAddPhotos.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.confirmDate = this.confirmDate.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
  }

  getYYYYMMDD(date, spliter="-"){
    let mm = date.getMonth()+1;
    let dd = date.getDate();
    return [date.getFullYear()+spliter,
          (mm>9 ? '' : '0') + mm + spliter,
          (dd>9 ? '' : '0') + dd
         ].join('');
  }

  confirmDate({startDate, endDate, startMoment, endMoment}) {
    this.setState({
      startDate,
      endDate
    });
  }

  onPrice(text){
    if(text.length==0){
      this.setState({priceValid: true, price: 0});
      return;
    }
    let price = parseFloat(text);
    if(isNaN(price)){
      this.setState({priceValid: false});
    }else{
      this.setState({priceValid: true, price: price});
    }
  }

  openCalendar() {
    this.calendar && this.calendar.open();
  }

  onAddPhotos(){
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 3,
      mediaType: "photo",
    }).then(images => {
      let taskImgs = [];
      for(let i=0; i<images.length; i++){
        taskImgs.push(images[i].sourceURL);
      }
      this.setState({taskImgs: taskImgs});
    });
  }

  onSubmit(){
    const {goBack} = this.props.navigation;

    const {
      description, price, taskImgs, startDate, endDate, tags,
    } = this.state;

    if(description.length==0){
      this.setState({hasErr: true, descriptionValid: false});
      return;
    }else{
      this.setState({descriptionValid: true});
    }

    if(!this.state.priceValid){
      this.setState({hasErr: true});
      return;
    }

    if(this.state.tags.length==0){
      this.setState({hasErr: false, tagValid: false});
      return;
    }else{
      this.setState({tagValid: true});
    }

    this.setState({hasErr: false});

    var body = new FormData();
    taskImgs.forEach(function (d, i) {
      body.append("photo", {
        uri: d,
        type: 'file',
        name: 'photo',//image.filename
        username: '123',
      });
    });


    body.append('user_name', '123');
    body.append('description', description);
    body.append('price', price);
    body.append('start_date', this.getYYYYMMDD(startDate));
    body.append('end_date', this.getYYYYMMDD(endDate));
    for(let i=0; i<tags.length; i++) body.append('tag', tags[i]);

    // console.log(body);
    var thisSave = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log("get response");
        var taskInfo = JSON.parse(xhr.responseText).task_info; // array
        console.log(taskInfo);
        thisSave.props.postTask(taskInfo);
        goBack();
      }
    };
    xhr.open('POST', 'http://172.26.110.5:3000/post_task');
    // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(body);

  }

  renderImages(){
    const {taskImgs} = this.state;

    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: config.normalPadding,}}>
      <ScrollView
        // horizontal
        style={styles.taskItemImages}
        contentContainerStyle={{flex:1, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center'}}
      >
        {this.state.taskImgs.map((item, key) => (<Image style={styles.taskImg} source={{uri: item}}/>))}
      </ScrollView>
      </View>
    );
  }

  renderErr(){
    if(!this.state.descriptionValid){
      return <Text style={{fontSize: 18, color: 'orange', fontWeight: 'bold'}}>Task description cannot be empty</Text>;
    }
    if(!this.state.priceValid){
      return <Text style={{fontSize: 18, color: 'orange', fontWeight: 'bold'}}>Please enter a valid price</Text>;
    }
    if(!this.state.tagValid){
      return <Text style={{fontSize: 18, color: 'orange', fontWeight: 'bold'}}>Please choose at least one tag</Text>;
    }
    return null;
  }

  render(){
    const {startDate, endDate} = this.state;
    console.log(startDate);
    console.log(endDate);

    return (
      <ScrollView style={styles.container}>
        {this.state.hasErr && this.renderErr()}
        <View style={{flex:1, padding: config.normalPadding}}>
          <MultipleTags
            tags={config.tags}
            preselectedTags={config.tags}
            search={false}
            onChangeItem={(tags) => {this.setState({tags})}}
            title="Topic"
          />
        </View>
        <TextInput
          style={styles.textInput}
          multiline
          autoFocus
          editable
          onChangeText={(text) => this.setState({description: text})}
          maxLength={800}
          maxHeight={200}
          placeholder={"Task description"}
        />
        {this.state.taskImgs.length>0? this.renderImages() : null}
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.textPrice}
            placeholder={"Price: free as default"}
            keyboardType={'numeric'}
            onChangeText={this.onPrice}
          />
        <MKButton
            style={styles.button}
            shadowRadius = {1}
            shadowOffset={{width: 0, height: 0.5}}
            shadowOpacity={0.5}
            backgroundColor={config.colorBlue}
            onPress={this.openCalendar}
          >
            <Text style={{fontWeight: 'bold'}}>
              {"Date: " + this.getYYYYMMDD(startDate) + " / " + this.getYYYYMMDD(endDate)}
            </Text>
        </MKButton>
        <MKButton
          style={styles.button}
          shadowRadius = {1}
          shadowOffset={{width: 0, height: 0.5}}
          shadowOpacity={0.5}
          backgroundColor={config.colorRed}
          onPress={this.onAddPhotos}
        >
          <Text style={{fontWeight: 'bold'}}>Add Photos</Text>
        </MKButton>
        <MKButton
          style={styles.button}
          shadowRadius = {1}
          shadowOffset={{width: 0, height: 0.5}}
          shadowOpacity={0.5}
          backgroundColor={config.colorPrimary}
          onPress={this.onSubmit}
        >
          <Text style={{fontWeight: 'bold'}}>Submit</Text>
        </MKButton>
        </View>
        <Calendar
          i18n="en"
          ref={(calendar) => {this.calendar = calendar;}}
          format="YYYYMMDD"
          startDate={this.getYYYYMMDD(this.state.startDate, "")}
          endDate={this.getYYYYMMDD(this.state.endDate, "")}
          onConfirm={this.confirmDate}
        />
      </ScrollView>
    );
  }
}

export default connect(
    state => ({
      username: state.user.username,
      email: state.user.email,
    }), {
      postTask,
    })(PostTask);
