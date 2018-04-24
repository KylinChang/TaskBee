import React, {Component} from 'react';
import {
    PushNotificationIOS,
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import openSocket from 'socket.io-client';

import { Root } from './config/router'
import Reducers from './reducers/index';
import {login, getMessage} from './reducers/user';
import config from './config/config';
var PushNotification = require('react-native-push-notification');
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

// make socket global variable, which can be accessed by all the components
global.socket = openSocket(config.DEVWebsite);

// user state
const store = createStore(Reducers);

socket.on('push_message', function(res){
    console.log("app page::message received!!");

    let user = store.getState().user;

    store.dispatch(getMessage(res.user_info, user, res.time, res.message_content, true));
    PushNotificationIOS.getApplicationIconBadgeNumber(function (num) {
        PushNotificationIOS.setApplicationIconBadgeNumber(num+1);
    });
    PushNotification.localNotificationSchedule({
        /* iOS and Android properties */
        title: "New Message", // (optional)
        message: res.message_content, // (required)
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        date: new Date(Date.now() + (1 * 1000)) // in 60 secs
    });
});


class App extends Component{
    render(){
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}

export default App;
