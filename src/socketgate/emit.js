import * as Keychain from 'react-native-keychain';
import { BASIC_WS_URL } from '../api';

const io = require('socket.io-client/dist/socket.io');

exports = module.exports = (websocket = null, action, par) => {
  // emit toward the server
  if (websocket) {
  	websocket.emit(action, par);
  }
}
