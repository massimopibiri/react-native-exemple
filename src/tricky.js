import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PushService from './pushNotif/PushService';
import {
  notificationSignup
} from './actions';

// get the store created and connect it to the state
import { configureStore } from './store';
import App from './containers/App/App';

// avoid yellow warnings (set up because à conflict of ReactNative@0.44)
console.ignoredYellowBox = ['Warning: BackAndroid'];
// initialize the pushNotifications and pass the store to save the token in database and dispatch actions
PushService.configure();
const store = configureStore();

export default class Tricky extends Component{
  render() {
    return (
      <Provider store={store} >
        <App />
      </Provider>
    );
  }
}
