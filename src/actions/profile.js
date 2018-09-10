import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { Actions } from 'react-native-router-flux';
import { SET_THEME } from '../api';

const socketEmit = require('../socketgate/emit');

exports.loadProfile = (data) => { // OK
	return {
		type: 'LOAD_PROFILE',
		data
	};
}

exports.loadStats = (stats) => {
	return {
		type: 'LOAD_STATS',
		stats
	};
}


exports.getScore = (websocket, userId) => { // ok
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'getScore', {userId});
  };
}


exports.loadScore = (score) => {
	return {
		type: 'LOAD_SCORE',
		score
	};
}

exports.imageProfile = (img) => {
	return {
		type: 'IMAGE_PROFILE',
		img
	};
}

exports.setThemes = (isSmoker, isBadEater, isBadSportsMan, isStressed) => {
  return function (dispatch) {
    return Keychain.getGenericPassword()
    .then(
      (credentials) => {
        if (credentials && credentials.password) {
          const data = {
            type: 'players',
            attributes: {
              isSmoker,
              isBadEater,
              isBadSportsMan,
              isStressed
            }
          };
          axios.post(SET_THEME, {data}, {
            headers: {
              'content-type': 'application/vnd.api+json',
              'authorization': 'bearer ' + credentials.password
            }
          })
          .then(
            (response) => {
            	Actions.tabbar();
            }
          )
          .catch((error) => {});
        } else {
          Actions.login();
        }
      }
    ).catch(
      (error) => {
        if (error) {
          Actions.login();
        }
      }
    );
  };
}

exports.setSingleThemes = (websocket, value, item) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'setSingleThemes', {
    	value,
    	item
    });
  };
}

exports.getAllParameters = (websocket, value, item) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'getAllParameters', {});
  };
}

exports.sendSuggestion = (websocket, txt) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'sendSuggestion', {txt});
  };
}

exports.setAvatar = (websocket, file) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'setAvatar', {file});
  };
}

exports.getProfile = (websocket) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'getProfile', {});
  };
}

exports.getProfileForce = (websocket) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'getProfileForce', {});
  };
}
