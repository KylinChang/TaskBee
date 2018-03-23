import React, {
  Platform
} from 'react-native'

export default config = {
  isIOS: Platform.OS == 'ios',

  mapboxPublicKey: 'pk.eyJ1Ijoia3lsaW5jaGFuZyIsImEiOiJjamV0aHNjbjcwaTc3MnFtcGg2c2VlZnNhIn0.H2aVgZ8lkQDkeF1nXOZISg',

  colorPrimary: '#FFAB4D',
  colorBackground: '#FAF9F5',
  colorRed: '#E6381F',
  colorBlue: '#4A90E2',
  colorGreen: '#9FE0DB',
  colorPink: '#F9678F',

  normalPadding: 14,
  tabHeight: 48,
  bannerHeight: Platform.OS === 'ios' ? 64 : 56,
  textInputHeight: 48,
};
