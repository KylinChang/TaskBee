import React, {Component} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { Root } from './config/router'
import Reducers from './reducers/index';
import {login, } from './reducers/user';

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
