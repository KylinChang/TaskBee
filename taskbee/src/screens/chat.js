import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    StyleSheet,
    PushNotificationIOS,
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
var PushNotification = require('react-native-push-notification');


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
        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
                console.log( 'TOKEN:', token );
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );

                // process the notification

                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "YOUR GCM SENDER ID",

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true,
        });
        PushNotificationIOS.setApplicationIconBadgeNumber(this.props.notify - this.props.buddies[this.props.buddy.username].newMessages);
        const {clearNotify} = this.props;
        clearNotify(this.props.buddy.username);

        this.updateChat();
    }

    componentWillReceiveProps(nextProps){
        console.log("in props");
        console.log(nextProps);
        this.updateChat();
    }

    updateChat(clear){
        let buddy = this.props.buddy;
        let buddies = this.props.buddies;
        console.log( this.props.buddies);
        console.log( this.props.buddy);
        console.log( this.state);
        let thisSave = this;
        if(buddy.username != this.state.buddy.username || buddies[buddy.username].newMessages != 0)
        //if(true)
        {
            this.setState({buddy: buddy, messages: []});
            console.log(this.props.notify);
            console.log(buddies[buddy.username].newMessages);
            // PushNotificationIOS.setApplicationIconBadgeNumber(0);

            let newMsgs = [];
            buddies[buddy.username].messages.forEach(function (rawMsg, i) {
                let id = 2;
                if(rawMsg.sender.username == thisSave.props.me.username)
                    id = 1;
                let msg = {
                    _id: new Date().getTime() + i,
                    text: rawMsg.content,
                    createdAt: new Date(rawMsg.timestamp), // new Date().. * 1000?
                    user:{
                        _id: id,
                        name: rawMsg.sender.username,
                        avatar: rawMsg.sender.avatar,
                    },
                };
                newMsgs.push(msg);
                thisSave.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, [msg])
                }));
            });
            //this.setState({
            //  messages: newMsgs
            //});
            //this.setState(previousState => ({
            //  messages: GiftedChat.append(previousState.messages, newMsgs)
            //}));
        }
    }

    onSend(messages = []) {
        // PushNotification.localNotificationSchedule({
        //     /* iOS and Android properties */
        //     title: "My Notification Title", // (optional)
        //     message: "My Notification Message", // (required)
        //     playSound: true, // (optional) default: true
        //     soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        //     date: new Date(Date.now() + (5 * 1000)) // in 60 secs
        // });
        // PushNotificationIOS.setApplicationIconBadgeNumber(10);

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
