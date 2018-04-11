import React, {Component} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import openSocket from 'socket.io-client';

import { Root } from './config/router'
import Reducers from './reducers/index';
import {login, getMessage} from './reducers/user';
import config from './config/config';

global.socket = openSocket(config.DEVWebsite);





const store = createStore(Reducers);
// store.dispatch(login());


socket.on('push_message', function(res){
  console.log("app page::message received!!");

  let user = store.getState().user;
  //let username = user.username;
  //let email = user.email;
  //let avatar = user.avatar;

  store.dispatch(getMessage(res.user_info, user, res.time, res.message_content, true));
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
