import React, {
  Component,
} from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  MKTextField,
  MKColor,
}
from 'react-native-material-kit';

const styles = StyleSheet.create({
  textfield: {
    height: 42,
  },
  text: {
    fontSize: 18,
  }
});

const TextNormal = MKTextField.textfield()
  .withTintColor(MKColor.Orange)
  .withStyle(styles.textfield)
  .withTextInputStyle(styles.text)
  .build();

const TextPassword = MKTextField.textfield()
  .withTintColor(MKColor.Orange)
  .withStyle(styles.textfield)
  .withTextInputStyle(styles.text)
  .withPassword(true)
  .build();

export {
  TextNormal,
  TextPassword,
};
