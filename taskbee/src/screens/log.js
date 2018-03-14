import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Tabs from '../config/router';
import config from '../config/config';
import Flower from '../components/flower';
import Icon from '../components/icon';
import {SubmitButton,} from '../components/button';

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
});

class Log extends Component{
  constructor(props){
    super(props);
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
            <SubmitButton
              backgroundColor={"#FFF"}
              text={"Login"}
              onPress={() => this.props.navigation.navigate('Tabs')}/>
            <SubmitButton
              backgroundColor={config.colorPrimary}
              text={"Register"}
              onPress={()=>{}}/>
          </View>
        </View>
      </View>
    );
  }
}

export default Log;
