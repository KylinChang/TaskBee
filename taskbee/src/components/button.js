import React, {
  Component,
} from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {MKButton, mdl} from 'react-native-material-kit';

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

const FabButton = MKButton.coloredFab()
  .build();

const AccentFabButton = MKButton.accentColoredFab()
  .build();

export {
  SubmitButton,
  FabButton,
  AccentFabButton,
};
