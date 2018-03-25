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

import config from '../config/config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: config.normalPadding,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    height: 300,
    borderBottomWidth:2,
    borderBottomColor: config.colorBorder,
    padding: config.normalPadding,
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
    // marginRight: 9,
  },
});

class PostTask extends Component{
  constructor(props){
    super(props);

    this.state = {
      description: "",
      taskImgs: [],
    }

    this.onAddPhotos = this.onAddPhotos.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderImages = this.renderImages.bind(this);
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

    goBack();
  }

  renderImages(){
    const {taskImgs} = this.state;

    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: config.normalPadding,}}>
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

  render(){

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          multiline
          autoFocus
          editable
          onChangeText={(text) => this.setState({description: text})}
          maxLength={800}
          maxHeight={300}
          placeholder={"Task description"}
        />
        {this.state.taskImgs.length>0? this.renderImages() : null}
        <View style={styles.buttonContainer}>
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
      </View>
    );
  }
}

export default PostTask;
