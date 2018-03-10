import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import FontAwesome, { Icons } from 'react-native-fontawesome';

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
      },
    },
    Message: {
      screen: Message,
      navigationOptions: {
        title: 'Message',
        tabBarIcon: (<FontAwesome style={{fontSize: tabBarFontSize}}>{Icons.comments}</FontAwesome>),
      },
    },
    Forum: {
      screen: Forum,
      navigationOptions: {
        title: 'Forum',
        tabBarIcon: (<FontAwesome style={{fontSize: tabBarFontSize}}>{Icons.compass}</FontAwesome>),
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Me',
        tabBarIcon: (<FontAwesome style={{fontSize: tabBarFontSize}}>{Icons.user}</FontAwesome>),
      },
    },
  },
  {
    tabBarOptions:{activeBackgroundColor:'#add8e6'},
    animationEnabled: true,
    swipeEnabled: true,
  }
);

export const Root = StackNavigator(
  {
    Tabs: {
      screen: Tabs,
    },
  }
);
