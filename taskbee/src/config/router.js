import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import config from '../config/config';
import Log from '../screens/log';
import Task from '../screens/task';
import Message from '../screens/message';
import Forum from '../screens/forum';
import Profile from '../screens/profile';

const tabBarFontSize = 32;

export const Tabs = TabNavigator(
  {
    Task: {
      screen: Task,
      navigationOptions: {
        title: 'Task',
        tabBarIcon: (<FontAwesome style={{fontSize: tabBarFontSize}}>{Icons.forumbee}</FontAwesome>),
        headerStyle: {
          backgroundColor: config.colorPrimary,
        },
      },
    },
    Message: {
      screen: Message,
      navigationOptions: {
        title: 'Message',
        tabBarIcon: (<FontAwesome style={{fontSize: tabBarFontSize}}>{Icons.comments}</FontAwesome>),
        headerStyle: {
          backgroundColor: config.colorPrimary,
        },
      },
    },
    Forum: {
      screen: Forum,
      navigationOptions: {
        title: 'Forum',
        tabBarIcon: (<FontAwesome style={{fontSize: tabBarFontSize}}>{Icons.compass}</FontAwesome>),
        headerStyle: {
          backgroundColor: config.colorPrimary,
        },
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Me',
        tabBarIcon: (<FontAwesome style={{fontSize: tabBarFontSize}}>{Icons.user}</FontAwesome>),
        headerStyle: {
          backgroundColor: config.colorPrimary,
        },
      },
    },
  },
  {
    tabBarOptions:{
      activeBackgroundColor:config.colorPrimary,
    },
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
  }
);

export const Root = StackNavigator({
  Log: {
    screen: Log,
    navigationOptions: {
      header: null,
    },
  },
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      headerBackImage: null,
    },
  },
}, {
  initialRouteName: 'Log',
});
