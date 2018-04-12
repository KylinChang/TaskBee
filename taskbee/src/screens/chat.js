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

import {clearNotify, getMessage} from '../reducers/user';


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
    buddy: {
      username: "",
      email: "",
      avatar: ""
    }
  }

  constructor(props){
    super(props);
    this.onSend = this.onSend.bind(this);
    this.updateChat = this.updateChat.bind(this);
    //console.log(this.props.buddy);
  }
  componentWillMount() {
    this.setState({
      messages: [
        //{
        //  _id: 1,
        //  text: 'Hello developer',
        //  createdAt: new Date(),
        //  user: {
        //    _id: 2,
        //    name: 'React Native',
        //    avatar: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        //  },
        //},
      ],
    });

    //var thisSave = this;
    //socket.on('push_message', function(res){
    //  console.log("chat page::received!!");
    //  var msg = {
    //    _id: (new Date()).toString(),
    //    text: res.message_content,
    //    createdAt: new Date(),
    //    user:{
    //      _id: 2,
    //      name: res.send_user,
    //      avatar: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
    //    },
    //  };
    //  // console.log(msg);
    //  thisSave.setState(previousState => ({
    //    messages: GiftedChat.append(previousState.messages, [msg])
    //  }));
    //  // console.log(thisSave);
    //});
  }

  componentDidMount(){
    console.log("in mount");
    this.updateChat();
  }

  componentWillReceiveProps(nextProps){
    console.log("in props");
    console.log(nextProps);
    this.updateChat();
  }

  updateChat(){
    let buddy = this.props.buddy;
    let buddies = this.props.buddies;
    //console.log( this.props.buddies);
    //console.log( this.props.buddy);
    //console.log( this.state);
    let thisSave = this;
    if(buddy.username != this.state.buddy.username || buddies[buddy.username].newMessages != 0)
    //if(true)
    {
      this.setState({buddy: buddy, messages: []});
      const {clearNotify} = this.props;
      clearNotify(buddy.username);
      let newMsgs = [];
      buddies[buddy.username].messages.forEach(function (rawMsg, i) {
        var msg = {
          _id: new Date().getTime() + i,
          text: rawMsg.content,
          createdAt: new Date(rawMsg.timestamp), // new Date().. * 1000?
          user:{
            _id: 2,
            name: rawMsg.sender.username,
            avatar: rawMsg.sender.avatar,
          },
        };
        newMsgs.push(msg);
        thisSave.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, [msg])
        }));
      });
      console.log(newMsgs);
      console.log(this.state.messages);
      //this.setState({
      //  messages: newMsgs
      //});
      //this.setState(previousState => ({
      //  messages: GiftedChat.append(previousState.messages, newMsgs)
      //}));
    }
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    // console.log(this);
    // console.log(messages);
    // console.log(this);
    const {getMessage} = this.props;

    var oneMessage = {
      send_user: this.props.username,
      //receive_user: this.props.username,
      receive_user: this.props.buddy.username, // should be changed.
      message_content: messages[0].text
    }
    getMessage(this.props.me, this.props.buddy, new Date().getTime(), messages[0].text, false);
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
    //this.setState({messages: this.props.buddies[buddy.username]});

    //console.log( this.props.buddies);
    //console.log( this.props.buddy);

    //if(this.props.notify)
    //{
    //  console.log(buddies[buddy.username].messages);
    //  let newMsgs = [];
    //  buddies[buddy.username].messages.forEach(function (rawMsg, i) {
    //    console.log(i);
    //    var msg = {
    //      _id: rawMsg.timestamp,
    //      text: rawMsg.content,
    //      createdAt: new Date(rawMsg.timestamp), // new Date().. * 1000?
    //      user:{
    //        _id: 2,
    //        name: rawMsg.sender.username,
    //        avatar: rawMsg.sender.avatar,
    //      },
    //    };
    //    console.log(msg);
    //    newMsgs.push(msg);
    //  });
    //  this.setState(previousState => ({
    //    messages: GiftedChat.append(previousState.messages, newMsgs)
    //  }));
    //  const {clearNotify} = this.props;
    //  clearNotify(buddy.username);
    //}
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
      buddies: state.user.buddies,
      buddy: state.user.buddy,
      avatar: state.user.avatar,
      notify: state.user.notify,
      me: state.user.me,
    }),
    {
      clearNotify,
      getMessage,
    }
)(Chat);
