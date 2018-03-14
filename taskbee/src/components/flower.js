import React, {
  Component,
} from 'react';
import {
  Dimensions,
  Animated,
  PropTypes,
} from 'react-native';

import config from '../config/config';
import Icon from './icon';

const {height, width} = Dimensions.get('window');
const colors = [
  config.colorPrimary,
  config.colorRed,
  config.colorBlue,
  config.colorGreen,
];

class Flower extends Component{
  constructor(props){
    super(props);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speed = 20 + 25 * Math.random();
    this.duration = 1200 + 1200 * Math.random();
    this.state = {
      pos: new Animated.ValueXY(),
      opacity: new Animated.Value(0),
      rotation: new Animated.Value(1 - 2 * Math.random()),
    };
  }

  componentDidMount(){
    this.startAnimate();
    this.rotate();
  }

  startAnimate = () => {
    const top = Math.random() * height / 3;
    const len = height - top;
    this.state.opacity.setValue(0);
    this.state.pos.setValue({x: Math.random() * width, y: top});
    // Flower rotates with opacity from 0 to 1
    Animated.timing(
      this.state.opacity,
      {
        toValue: 1,
        duration: 1500,
      }
    ).start();
    // Flower rotates with position from a random position to another
    // random position which is under the original position
    Animated.timing(
      this.state.pos,
      {
        toValue: {x: Math.random() * width, y: top + len},
        duration: len * this.speed,
      }
    ).start(endState => {
      if(endState.finished) this.endAnimate();
    });
  };

  endAnimate = () => {
    Animated.timing(
      this.state.opacity,
      {
        toValue: 0,
        duration: 350,
      }
    ).start(endState => {
      if(endState.finished) this.startAnimate();
    });
  };

  rotate = () => {
    Animated.timing(
      this.state.rotation,
      {
        toValue: 1,
        duration: this.duration,
      }
    ).start(endState => {
      if(endState.finished) this.rotateBack();
    });
  };

  rotateBack = () => {
    Animated.timing(
      this.state.rotation, {
        toValue: -1,
        duration: this.duration,
      }
    ).start(endState => {
      if (endState.finished) this.rotate();
    });
  };

  render(){
    const {pos, opacity, rotation: rawRotation} = this.state;
    const rotate = rawRotation.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: ["-90deg", "0deg", "90deg"]});
    const transform = pos.getTranslateTransform();
    transform.push({rotate});
    return <Animated.View style={[{position: 'absolute'}, {opacity, transform}]}>
      <Icon name="flower" size={32} color={this.color}/>
    </Animated.View>
  }

};

export default Flower;
