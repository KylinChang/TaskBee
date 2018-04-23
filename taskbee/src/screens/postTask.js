import React, {
  Component,
} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {MKButton, mdl} from 'react-native-material-kit';
import ImagePicker from 'react-native-image-crop-picker';
import Calendar from 'react-native-calendar-select';
import MultipleTags from 'react-native-multiple-tags';

import {
  AccentFabButton,
  FabButton,
  ChatButton,
} from '../components/button';
import TextFieldAnimated from '../components/TextFieldAnimated';


import config from '../config/config';
import {postTask,} from '../reducers/user';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    paddingRight: 28,
    paddingLeft: 28,
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: config.normalPadding,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    position: 'absolute',
    bottom: 0,
    width: width,
  },

  textInput: {
    flex: 1,
    fontSize: 18,
    height: 200,
    paddingRight: 5,
    paddingLeft: 28,
    paddingBottom: 5,
    paddingTop: 15,
  },
  price: {
    fontSize: 18,
    flex: 1,
    width: 80,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  location: {
    fontSize: 18,
    flex: 2,
    width: width - 140,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },

  buttonDate:{
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,.1)',
    height: 42,
    borderRadius: 0,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    marginVertical: 0,
  },

  button: {
    shadowRadius: 0,
    height: 42,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: "center",
    width: width / 2,
  },
  taskItemImages:{
    flex: 1,
  },
  taskImg: {
    width: 100,
    height: 100,
    marginRight: 9,
  },
  fabContainer: {
    flex: 1,
    flexDirection: "row",
    position: 'absolute',
    bottom: 60,
    right: 10,
  },
  fabCol:{
    marginLeft: 10, marginRight: 10,
  },
});

class PostTask extends Component{
  constructor(props){
    super(props);

    this.state = {
      title: "",
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
      isSubmit: false,
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
    let thisStore = this;
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 3,
      mediaType: "photo",
      cropping: true,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      compressImageQuality: 0.75,
    }).then(images => {
      let taskImgs = [];
      for(let i=0; i<images.length; i++){
        taskImgs.push(images[i].sourceURL);
      }
      thisStore.setState({taskImgs: taskImgs});
    });
  }

  onSubmit(){
    const {isSubmit} = this.state;
    if(isSubmit) return;
    this.setState({isSubmit: true});
    const {goBack} = this.props.navigation;
    const {username, email} = this.props;
    const {
      title, description, price, taskImgs, startDate, endDate, tags,
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
        username: username,
      });
    });


    body.append('user_name', username);
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
      }else{
        thisSave.setState({isSubmit: false});
      }
    };
    xhr.open('POST', config.DEVURL + '/post_task');
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
    const {goBack} = this.props.navigation;

    return (
      <View style={{flex: 1}}>
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
        <View style={styles.buttonContainer}>
          <MKButton
            style={styles.buttonDate}
            onPress={this.openCalendar}
          >
            <Text style={{fontWeight: 'bold'}}>
              {"Date: " + this.getYYYYMMDD(startDate) + " / " + this.getYYYYMMDD(endDate)}
            </Text>
        </MKButton>
        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', padding: 0}}>
        <TextFieldAnimated
          label = "Price"
          style = {styles.price}
          placeholder = {'Price'}
          keyboardType={'numeric'}
          onChangeText={this.onPrice}
        />

        <TextFieldAnimated
          label = "Specific loaction (optional)"
          style = {styles.location}
          placeholder = {'Specific loaction (optional)'}
        />
        </View>
        <TextInput
          label = "Description"
          style = {styles.textInput}
          multiline
          autoFocus
          editable
          onChangeText={(text) => this.setState({description: text})}
          maxLength={800}
          maxHeight={200}
          placeholder={'Description'}
        />
        {this.state.taskImgs.length>0? this.renderImages() : null}


        <Calendar
          i18n="en"
          ref={(calendar) => {this.calendar = calendar;}}
          format="YYYYMMDD"
          startDate={this.getYYYYMMDD(this.state.startDate, "")}
          endDate={this.getYYYYMMDD(this.state.endDate, "")}
          onConfirm={this.confirmDate}
        />
      </ScrollView>
      <View style={styles.fabContainer}>
        <View style={styles.fabCol}>
          <FabButton onPress={this.onAddPhotos}>
            <Image pointerEvents="none" source={require('../../assets/plus_white.png')}/>
          </FabButton>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <MKButton
          style={styles.button}
          backgroundColor={config.colorPrimary}
          onPress={this.onSubmit}
        >
          <Text style={{fontWeight: 'bold'}}>Submit</Text>
        </MKButton>
        <MKButton
          style={styles.button}
          backgroundColor={config.colorBlue}
          onPress={() => goBack()}
        >
          <Text style={{fontWeight: 'bold'}}>Cancel</Text>
        </MKButton>
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
      postTask,
    })(PostTask);
