import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { SAVE_TOKEN } from '../api';
/* import {
  addAlert
} from './alerts'; */

const socketEmit = require('../socketgate/emit');

exports.notificationSignup = (websocket, data) => {
  return function (dispatch) {
    // service argument optional
    return Keychain.getGenericPassword()
    .then(
      (credentials) => {
        if (credentials && credentials.password) {
          const data = {
            type: 'players',
            attributes: {
              pushToken: data.token,
              os: data.os
            }
          };
        	// save the pushToken in the serve into the user collection
          axios.post(SAVE_TOKEN, {data}, {
            headers: { 'content-type': 'application/vnd.api+json', 'authorization': 'bearer ' + credentials.password }
          })
          .then(
            (response) => {
	            // dispatch(addAlert('cool', 'Les Notifications Push ont été activées'));
            }
          )
          .catch((error) => {});
        } else {
          dispatch(setRouter(false));
          Actions.login();
        }
      }
    ).catch(
      (error) => {}
    );
  };
}
