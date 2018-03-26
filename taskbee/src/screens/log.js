import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {MKTextField,MKColor,} from 'react-native-material-kit';

import Tabs from '../config/router';
import Register from './register';
import config from '../config/config';
import Flower from '../components/flower';
import Icon from '../components/icon';
import {SubmitButton,} from '../components/button';

import {login, } from '../reducers/user';
// import {socket, } from '../utils/socket';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: config.colorBackground,
  },
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
  },
  button:{
    flex: 1,
    marginVertical: 6,
    alignSelf: 'center',
  },
  controls: {
    marginTop: 10,
    justifyContent: 'center',
    paddingHorizontal: 64,
  },
  inputView:{
    height: 42,
  },
  inputText:{
    fontSize: 18,
  }
});

class Log extends Component{
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.loginSubmit = this.loginSubmit.bind(this);
  }

  loginSubmit(){
    let msg = {
      user_name: this.state.username,
      password: this.state.password,
    };
    socket.emit(
      'login',
      msg
    );
    const {login, navigation} = this.props;

    socket.on('login_res',
        function(data)
        {
            if(data.state)
            {
                login(data.user_info.username, data.user_info.email, data.message_content);
                navigation.navigate('Tabs');
            }
        });
  }

  render(){
    const {navigator} = this.props;

    return(
      <View style={styles.main}>
        <View style={styles.background} renderToHardwareTextureAndroid>
          <Flower/>
          <Flower/>
          <Flower/>
          <Flower/>
          <Flower/>
          <Flower/>
        </View>

        <View style={styles.container}>
          <Icon style={styles.logo} name="taskbee" size={96} color={config.colorPrimary}/>
          <View style={styles.controls}>
            <MKTextField
              autoFocus
              style={styles.inputView}
              tintColor={MKColor.Orange}
              textInputStyle={styles.inputText}
              placeholder="email/username"
              onChangeText={(text) => this.setState({username:text})}
            />

            <MKTextField
              style={styles.inputView}
              tintColor={MKColor.Orange}
              textInputStyle={styles.inputText}
              placeholder="password"
              onChangeText={(text) => this.setState({password:text})}
              password={true}
            />

            <SubmitButton
              backgroundColor={"#FFF"}
              text={"Login"}
              onPress={this.loginSubmit}/>
            <SubmitButton
              backgroundColor={config.colorPrimary}
              text={"Register"}
              onPress={() => this.props.navigation.navigate('Register')}/>
          </View>
        </View>
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
    login,
  })(Log);
