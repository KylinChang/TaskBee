import React, {
  Component,
} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {MKButton, mdl} from 'react-native-material-kit';

import config from '../config/config';
import Icon from '../components/icon';

const styles = StyleSheet.create({
  submitButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,.1)',
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.7,
    shadowColor: 'black',
    height: 42,
    borderRadius: 21,
    paddingHorizontal: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#fff',
    height: 48,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: config.normalPadding,
  },
  lineTextButton:{
    backgroundColor: '#fff',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: config.normalPadding,
  },
  lineButtonRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: config.normalPadding,
    height: 96,
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: config.normalPadding,
    height: 48,
  },

  accountButtonTextView: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: config.normalPadding,
  },
  chatButtonTextView: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: config.normalPadding,
  },

  textNormal: {
    marginLeft: 9,
    color: '#4a4a4a',
  },
  textMain: {
    flex: 1,
    textAlign: 'right',
  },
  textCenter: {
    color: '#4a4a4a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class SubmitButton extends Component{
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    style: PropTypes.any,
  }

  constructor(props){
    super(props);
  }

  render(){
    const {backgroundColor, text, onPress, style, ...others} = this.props;

    return (
      <MKButton
        backgroundColor = {backgroundColor}
        shadowRadius = {1}
        shadowOffset={{width: 0, height: 0.5}}
        shadowOpacity={0.5}
        // shadowColor={config.borderColor}
        onPress={onPress}
        style={styles.submitButton}
        // rippleColor={config.rippleColor}
        maskBorderRadius={21}
        rippleLocation="center"
        elevation={1}

      >{
        <Text style={{fontWeight: 'bold'}}>{text}</Text>
      }</MKButton>
    );
  }
}

class LineButton extends Component{
  static propTypes = {

  }

  constructor(props){
    super(props);
  }

  render(){
    return(
      <MKButton
        backgroundColor="#fff"
        onPress={this.props.onPress}
        style={[styles.button, this.props.style]}
      >
        {this.props.icon && <Icon size={16} name={this.props.icon} color={config.colorPrimary}/>}
        <Text pointerEvents="none" style={styles.textNormal}>
          {this.props.label}
        </Text>
        <View style={styles.lineButtonRight}>
          <Text pointerEvents="none" style={styles.textMain}>
          {""}
          </Text>
          {this.props.children}
          {!this.props.noJump && <Icon size={16} name="right-open-big" color='#737373'/>}
        </View>
      </MKButton>
    );
  }
}

class LineTextButton extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <MKButton
        backgroundColor="#fff"
        onPress={this.props.onPress}
        style={[styles.lineTextButton, this.props.style]}
      >
        <Text pointerEvents="none" style={styles.textCenter}>
          {this.props.label}
        </Text>
      </MKButton>
    );
  }
}

class AccountButton extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
    <MKButton
      backgroundColor="#fff"
      onPress={this.props.onPress}
      style={[styles.accountButton, this.props.style]}
    >
      <Image
        style={{width: 64, height: 64}}
        source={{uri: this.props.imgUri?this.props.imgUri:config.defaultAvatar}}
        key= {new Date()}
      />
      <View style={styles.accountButtonTextView}>
        <Text pointerEvents="none" style={styles.textNormal}>
          {this.props.username}
        </Text>
        <Text pointerEvents="none" style={styles.textNormal}>
          {'Email: ' + this.props.email}
        </Text>
      </View>
    </MKButton>
  );
  }
}

class ChatButton extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {onPress, style, imgUri, username, email} = this.props;

    return(
    <MKButton
      backgroundColor="#fff"
      onPress={onPress}
      style={[styles.chatButton, style]}
    >
      <Image
        style={{width: 36, height: 36}}
        source={{uri: imgUri?imgUri:config.defaultAvatar}}
      />
      <View style={styles.chatButtonTextView}>
        <Text pointerEvents="none" style={styles.textNormal}>
          {username}
        </Text>
        <Text pointerEvents="none" style={styles.textNormal}>
          {'Email: ' + email}
        </Text>
      </View>
    </MKButton>
  );
  }
}

const FabButton = MKButton.coloredFab()
  .build();

const AccentFabButton = MKButton.accentColoredFab()
  .build();

export {
  SubmitButton,
  LineButton,
  LineTextButton,
  AccountButton,
  ChatButton,

  FabButton,
  AccentFabButton,
};
