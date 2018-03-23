import React, {Component} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import config from '../config/config';
import {
  FabButton,
} from '../components/button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colorBackground,
  },
  fabContainer: {
    flex: 1,
    flexDirection: "row",
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  fabCol:{
    marginLeft: 10, marginRight: 10,
  },
});

class Message extends Component{
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.fabContainer}>
          <View style={styles.fabCol}>
            <FabButton>
              <FontAwesome>{Icons.userPlus}</FontAwesome>
            </FabButton>
          </View>
        </View>
      </View>
    );
  }
}

export default Message;
