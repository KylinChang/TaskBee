import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
global.PaymentRequest = require('react-native-payments').PaymentRequest;

import config from "../config/config";
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
        imgUri: config.defaultAvatar,
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
            username: this.props.username,
    };
    var body = new FormData();
        body.append('photo', photo);
        body.append('username', this.props.username);


    console.log(body);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log("get 1!");
            console.log(xhr.responseText);
            var imgUri = config.DEVURL+JSON.parse(xhr.responseText).url;
            console.log(imgUri);
            thisStore.setState({imgUri: imgUri});
        }
    };
    xhr.open('POST', config.DEVURL + '/uploadphoto');
    xhr.send(body);

    });
  }
  addValue()
  {
      console.log("add value");
      const METHOD_DATA = [{
          supportedMethods: ['apple-pay'],
          data: {
              merchantIdentifier: 'merchant.com.your-app.namespace',
              supportedNetworks: ['visa', 'mastercard', 'amex'],
              countryCode: 'US',
              currencyCode: 'USD'
          }
      }];

      const DETAILS = {
          id: 'basic-example',
          displayItems: [
              {
                  label: 'Add Value to TaskBee Wallet',
                  amount: { currency: 'USD', value: '30.00' }
              }
          ],
          total: {
              label: 'TaskBee Group',
              amount: { currency: 'USD', value: '30.00' }
          }
      };

      const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
      paymentRequest.show().then(paymentResponse => {
          // Your payment processing code goes here
          paymentResponse.complete('success');
          // send to server..

          return processPayment(paymentResponse);
      });
  }

  render(){
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.section}>
            <AccountButton
              username={this.props.username}
              email={this.props.email}
              imgUri={this.state.imgUri}
              onPress={this.choose_avatar}
            />
          </View>
          <View style={styles.section}>
            <LineButton icon="vallet" label={"Wallet"} text={'$'}
              onPress = {this.addValue}/>
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

export default connect(
    state => ({
      username: state.user.username,
      email: state.user.email,
    }))(Profile);
