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
import {MKButton, mdl} from 'react-native-material-kit';
import ImagePicker from 'react-native-image-crop-picker';
import Calendar from 'react-native-calendar-select';
import MultipleTags from 'react-native-multiple-tags';

import config from '../config/config';

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

  getYYYYMMDD(date){
    let mm = date.getMonth();
    let dd = date.getDate();
    return [date.getFullYear()+"-",
          (mm>9 ? '' : '0') + mm + "-",
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
        taskImgs.push(images[i].path);
      }
      this.setState({taskImgs: taskImgs});
    });
  }

  onSubmit(){
    const {goBack} = this.props.navigation;

    const {
      description, price, askImgs, startDate, endDate
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

    goBack();
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
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onConfirm={this.confirmDate}
        />
      </ScrollView>
    );
  }
}

export default PostTask;
