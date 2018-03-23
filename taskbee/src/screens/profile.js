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
  }

  choose_avatar(){
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true
    // }).then(image => {
    //   console.log(image);
    // });
  }

  render(){
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.section}>
            <AccountButton
              username={"Stephen"}
              email={"gdgyzzl@gmail.com"}
              imgUri={'https://facebook.github.io/react-native/docs/assets/favicon.png'}
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
