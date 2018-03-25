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



/*
change avatar.
*/
  choose_avatar(){
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
        var thisStore = this;
      // this.setState({imgUri: image.path});


      //send to server
      // console.log(image);
    var photo = {
            uri: image.sourceURL,
            type: 'file',
            name: 'photo',//image.filename
            username: 'haolin',
    };
    var body = new FormData();
        body.append('photo', photo);
        // body.append('photo', "https://facebook.github.io/react-native/docs/assets/favicon.png");
        body.append('username', 'haolin');


    console.log(body);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log("get 1!");
            console.log(xhr.responseText);
            var imgUri = 'http://172.26.110.5:3000'+JSON.parse(xhr.responseText).url;
            console.log(imgUri);
            thisStore.setState({imgUri: imgUri});
        }
    };
    xhr.open('POST', 'http://172.26.110.5:3000/uploadphoto');
    // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(body);
    // socket.on('uploadphotofinish', (res) => {
    //     console.log("finish!");
    //     console.log(res);
    // })


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
