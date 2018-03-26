import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import FontAwesome, { Icons } from 'react-native-fontawesome';
import {connect} from 'react-redux';
import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';

import config from '../config/config';
import {
    FabButton,
} from '../components/button';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //backgroundColor: config.colorBackground,
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

class Chat extends React.Component {
  state = {
    messages: [],
  }

  constructor(props){
    super(props);
    this.onSend = this.onSend.bind(this);
    console.log(this.props.buddy);
  }
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
          },
        },
      ],
    });
    var thisSave = this;
    socket.on('push_message', function(res){
      console.log("received!!");
      var msg = {
        _id: (new Date()).toString(),
        text: res.message_content,
        createdAt: new Date(),
        user:{
          _id: 2,
          name: res.send_user,
          avatar: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        },
      };
      // console.log(msg);
      thisSave.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [msg])
      }));
      // console.log(thisSave);
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    // console.log(this);
    // console.log(messages);
    // console.log(this);
    var oneMessage = {
      send_user: this.props.username,
      receive_user: this.props.username, // should be changed.
      message_content: messages[0].text
    }
    // console.log(oneMessage);
    socket.emit("send_message", oneMessage);
  }



  renderBubble (props) {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
        left: {
            backgroundColor: 'white'
        }
        // right: {
        //   backgroundColor: '#2c3e50'
        // }
      }}
        />
    )
  }


  render() {
    return (
        <GiftedChat
            messages={this.state.messages}
            renderBubble={this.renderBubble}
            onSend={messages => this.onSend(messages)}
            user={{
          _id: 1,
        }}
        />
    )
  }
}

export default connect(
    state => ({
      username: state.user.username,
      messages: state.user.messsages,
      buddy: state.user.buddy,
    })
)(Chat);
