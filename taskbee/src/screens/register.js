import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  MKTextField,
  MKColor,
} from 'react-native-material-kit';
import {connect} from 'react-redux';

import {register, } from '../reducers/user';
import {
  TextNormal,
  TextPassword,
} from '../components/text';
import {
  SubmitButton,
} from '../components/button'

import config from '../config/config';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: config.colorBackground,
    paddingHorizontal: 64,
  },
});

class Register extends Component{
  constructor(props){
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      requireValid: false,
      emailValid: false,
      usernameValid: false,
      passwordValid: false,
      testR: "123"
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  renderErr(){
    const {requireValid, emailValid, usernameValid, passwordValid} = this.state;
    if(!requireValid){
      return <Text>Please fill in all required fields.</Text>;
    }
    if(!emailValid){
      return <Text>Invalid email.</Text>;
    }
    if(!usernameValid){
      return <Text>Invalid user name.</Text>
    }
    if(!passwordValid){
      return <Text>Confirm password is not the same as the password.</Text>
    }
    return null;
  }

  onSubmit(){
    // Validate user information
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {
      email, username, password, confirmPassword
    } = this.state;
    if(email.length>0 && username.length>0 && password.length>0 && confirmPassword>0){
      this.setState({requireValid: true});
    }else{
      this.setState({requireValid: false});
      return;
    }
    if(reg.test(email)){
      this.setState({emailValid: true});
    }else{
      this.setState({emailValid: false});
      return;
    }
    this.setState({usernameValid: true});
    if(password==confirmPassword){
      this.setState({passwordValid: true});
    }else{
      this.setState({passwordValid: false});
      return;
    }

    let msg = {
      email: email,
      user_name: username,
      password: password,
    }
    const {register, navigation,} = this.props;
    // this.props.register(username, email, config.defaultAvatar);
    // this.props.navigation.navigate('Tabs');


    var body = new FormData();

    body.append('email', email);
    body.append('user_name', username);
    body.append('password', password);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText); // array
        if(data.state){
          register(username, email, config.defaultAvatar);
          navigation.navigate('Tabs');
        }
      }
    };
    console.log(body);
    xhr.open('POST', config.DEVURL + '/register');
    xhr.send(body);


     //
     //socket.on('register_res', (data) => {
     // if(data.state){
     //   register(username, email, config.defaultAvatar);
     //   navigation.navigate('Tabs');
     // }
     //});
     //socket.emit(
     //  'register',
     //  msg
     //);
  }

  render(){
    return (
      <View style={styles.main}>
        <TextNormal
          onChangeText={(text) => {
            this.setState({email: text});
            // this.validate();
          }}
          placeholder="email"
          autoFocus/>
        <TextNormal
          onChangeText={(text) => {
            this.setState({username: text});
            // this.validate();
          }}
          placeholder="username"/>
        <TextPassword
          onChangeText={(text) => {
            this.setState({password: text});
            // this.validate();
          }}
          placeholder="password"/>
        <TextPassword
          onChangeText={(text) => {
            this.setState({confirmPassword: text});
            // this.validate();
          }}
          placeholder="confirm password"/>
        {this.renderErr()}
        <SubmitButton
          backgroundColor={config.colorPrimary}
          text={"Submit"}
          onPress={this.onSubmit}/>
      </View>
    );
  }
}

export default connect(
  state => ({
    logError: state.user.logError,
    loggedIn: state.user.loggedIn,
  }),
  {
    register,
  })(Register);
