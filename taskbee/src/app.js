import React, {Component} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import openSocket from 'socket.io-client';

import { Root } from './config/router'
import Reducers from './reducers/index';
import {login, } from './reducers/user';
import config from './config/config';

global.socket = openSocket(config.DEVWebsite);

const store = createStore(Reducers);
// store.dispatch(login());

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
