import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  LineButton,
  LineTextButton,
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
  render(){
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
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
