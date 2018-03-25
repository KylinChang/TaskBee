import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {
  LineButton,
  LineTextButton,
  AccountButton,
} from '../components/button';

import {
  socket,
} from '../utils/socket';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: config.colorBackground,
  },
  contentContainer: {
    paddingVertical: config.normalPadding,
  },
  section: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,.1)',
    marginBottom: 14,
  },
  spliter: {
    height: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    marginHorizontal: 14,
    backgroundColor: '#E7E7E7',
  },
});

class Profile extends Component{
  constructor(props){
    super(props);

    this.choose_avatar = this.choose_avatar.bind(this);
    this.state = {
        imgUri: "https://facebook.github.io/react-native/docs/assets/favicon.png",
        username: "Stephen",
        email: "gdgyzzl@gmail.com"
    };
  }

  choose_avatar(){
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.setState({imgUri: image.path});


      //send to server
      // socket.emit("upload_photo", { data: {photo: image} });
      console.log(image);
      var photo = {
          uri: image.sourceURL,
          type: 'file',
          name: 'photo',//image.filename
      };

    var body = new FormData();
    // body.append('authToken', 'secret');
    // body.append('photo', photo);
    body.append('file', image.sourceURL);
    // body.append('name', 'photo');


    console.log(body);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://172.26.110.5:3000/uploadphoto');
    // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(body);


//     fetch('http://172.26.110.5:3000/uploadphoto', {
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'multipart/form-data'
//   },
//   method: 'POST',
//   body: body
// });


    });
  }

  render(){
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.section}>
            <AccountButton
              username={this.state.username}
              email={this.state.email}
              imgUri={this.state.imgUri}
              onPress={this.choose_avatar}
            />
          </View>
          <View style={styles.section}>
            <LineButton icon="vallet" label={"Wallet"} text={'$'}/>
            <View style={styles.spliter}/>
            <LineButton label={"My Posts"}/>
            <View style={styles.spliter}/>
            <LineButton label={"My Underway Appointments"}/>
          </View>
          <View style={styles.section}>
            <LineTextButton label={"Log Out"}/>
          </View>


        </ScrollView>
      </View>
    );
  }
}

export default Profile;
