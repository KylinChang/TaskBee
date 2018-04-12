import React, {
  Platform,
  StyleSheet,
} from 'react-native'

export default config = {
  isIOS: Platform.OS == 'ios',
  DEVWebsite: 'http://13.58.57.31:1234',
  DEVURL: 'http://13.58.57.31:3000',
  //DEVWebsite: 'http://172.26.104.118:1234',
  //DEVURL: 'http://172.26.104.118:3000',
  tags: ['undergraduate', 'graduate', 'sport', 'art', 'others'],

  mapboxPublicKey: 'pk.eyJ1Ijoia3lsaW5jaGFuZyIsImEiOiJjamV0aHNjbjcwaTc3MnFtcGg2c2VlZnNhIn0.H2aVgZ8lkQDkeF1nXOZISg',

  colorPrimary: '#FFAB4D',
  colorBackground: '#FAF9F5',
  colorRed: '#E6381F',
  colorBlue: '#4A90E2',
  colorGreen: '#9FE0DB',
  colorPink: '#F9678F',
  colorText: '#4A4A4A',
  colorBorder: 'rgba(0,0,0,.1)',
  colorRipple: 'rgba(0,0,0,.1)',
  colorSubtle: '#E7E7E7',

  borderRaidus: 3,
  borderWidth: StyleSheet.hairlineWidth,

  normalPadding: 14,
  tabHeight: 48,
  bannerHeight: Platform.OS === 'ios' ? 64 : 56,
  textInputHeight: 48,

  defaultAvatar: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
};
