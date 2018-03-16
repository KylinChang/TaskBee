import React, {Component} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  MKTextField,
  MKColor,
} from 'react-native-material-kit';
import {
  TextNormal,
  TextPassword,
} from '../components/text';
import {
  SubmitButton,
} from '../components/button'

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
  render(){
    return (
      <View style={styles.main}>
        <TextNormal placeholder="email" autoFocus/>
        <TextNormal placeholder="username"/>
        <TextPassword placeholder="password"/>
        <TextPassword placeholder="confirm password"/>
        <SubmitButton
          backgroundColor={config.colorPrimary}
          text={"Submit"}
          onPress={() => {}}/>
      </View>
    );
  }
}

export default Register;
