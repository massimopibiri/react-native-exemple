import * as Keychain from 'react-native-keychain';
import { BASIC_WS_URL } from '../api';// library to encrypt and decrypt data

const io = require('socket.io-client/dist/socket.io');
const socketEvents = require('./events');

exports = module.exports = (store) => {
  // verify if the keychain exists
  Keychain.getGenericPassword().then((credentials) => {
    // if there is a keychain, the user has been already logged 
    if (credentials && credentials !== false) {
    	// extract the passwordToken
      const { password } = credentials;
      // initialize the socket connection with the passwordToken
      const websocket = io(BASIC_WS_URL, {
        jsonp: false,
        // forceNew:true,
        transports: ['websocket'], // you need to explicitly tell it to use websockets
        query: {
          token: password
        }
      });
  
      // connect to socket
      websocket.connect();
      websocket.on('connect', (socket) => {});

      websocket.on('reconnect', (socket) => {});

      websocket.on('disconnect', (socket) => {});

      websocket.on('error', (error) => {});
      // all the events to listen
      socketEvents(websocket, store);
    }
  });
};
