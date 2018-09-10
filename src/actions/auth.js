import React from 'react-native';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import PushNotification from 'react-native-push-notification';
import { Actions } from 'react-native-router-flux';
import { SIGNIN_URL, SIGNIN_WITH_TOKEN, SIGNUP_URL, RENEW_PSW, RECOVER_PSW } from '../api';
import {
  addAlert
} from './alerts';
import {
  handleNewNotifs
} from '../functions/notifs';

const socketEmit = require('../socketgate/emit');

const { AsyncStorage } = React;

const authUser = (userId) => {
	return {
		type: 'AUTH_USER',
		userId
	};
};

const unauthUser = () => {
  return {
    type: 'UNAUTH_USER'
  };
};

const setRouter = (boolean) => {
  return {
    type: 'SET_ROUTER',
    boolean
  };
};

exports.setRouterExt = (boolean) => {
  return {
    type: 'SET_ROUTER',
    boolean
  };
};

exports.validTyping = () => {
  return {
    type: 'VALID_TYPING'
  };
};

exports.login = (email, password) => {
	return function (dispatch, getState) {
    const query = {
      grant_type: 'password',
      email: email,
      password: password
    };
		return axios.post(SIGNIN_URL, query)
    .then(
      (response) => {
        // saving the token for futur auto-login
        return Keychain
          .setGenericPassword(response.data.userId, response.data.token)
          .then(() => {
            // register in state the id returned
            dispatch(authUser(response.data.userId));
            // check if the program is finished and eventually render a limitated router
            if (response.data && response.data.program && response.data.program.finished && response.data.program.finished === true) {
              dispatch(setRouter(true));
            } else {
              dispatch(setRouter(false));
            }
            const state = getState();
            if (state && state.programData && state.programData.executed === true) {
	            if (
	              (response.data && !response.data.program)
	              || (response.data && response.data.program.finished === true && (!response.data.firstConnectionDone || response.data.firstConnectionDone === false))
	            ) {
	              Actions.temporary();
	              // verify if it is the first connection for this user
	            } else if (response.data && response.data.firstConnectionDone && response.data.firstConnectionDone === true) {
	              Actions.tabbar();
	            } else {
	              // redirect to the slides and the first configuration
	              Actions.firstIntro();
	            }
	            // request permissions to send push notifications
              PushNotification.requestPermissions();
	          }
          })
          .catch((error) => {
            if (error) {
              dispatch(addAlert('cool', 'Desolé, le login n\'était pas possible'));
            }
          });
      }
    )
    .catch((error) => {
      if (error) {
        dispatch(setRouter(false));
        Actions.login();
        dispatch(addAlert('cool', 'Desolé, le login n\'était pas possible'));
      }
    });
	};
}

exports.signinWithToken = () => {
  return function (dispatch, getState) {
    // service argument optional
    return Keychain.getGenericPassword()
    .then(
      (credentials) => {
        if (credentials && credentials.password) {
          const data = {
            type: 'password',
            attributes: {}
          };
          axios.post(SIGNIN_WITH_TOKEN, {data}, {
            headers: {
              'content-type': 'application/vnd.api+json',
              'authorization': 'bearer ' + credentials.password
            }
          })
          .then(
            (response) => {
              // register in state the id returned
              dispatch(authUser(response.data.userId));
              // check if the program is finished and eventually render a limitated router
              if (response.data && response.data.program && response.data.program.finished && response.data.program.finished === true) {
                dispatch(setRouter(true));
              } else {
                dispatch(setRouter(false));
              }

              // if we have new notifications not read, show the badge number on the tabbar
              if (response && response.data && response.data.listNotifs) {
              	// handle the display of the 'not read notifications' in the tabbar
              	handleNewNotifs(dispatch, response.data.listNotifs);
              } else {
              	handleNewNotifs(dispatch, null);
              }

              const state = getState();
              if (state && state.programData && state.programData.executed === true) {
	              if (
	                (response.data && !response.data.program)
	                || (response.data && response.data.program.finished === true && (!response.data.firstConnectionDone || response.data.firstConnectionDone === false))
	              ) {
	                Actions.temporary();
	                // verify if it is the first connection for this user
	              } else if (response.data && response.data.firstConnectionDone && response.data.firstConnectionDone === true) {
	                Actions.tabbar();
	              } else {
	                // redirect to the slides and the first configuration
	                Actions.firstIntro();
	              }
              }
            }
          )
          .catch((error) => {
            if (error) {
					    // remove user from memory of the device
					    return AsyncStorage.multiRemove(['userId', 'loginToken'], function(err) {
					      return Keychain.resetGenericPassword()
					      .then(() => {
		              // remove user from state
		              dispatch(unauthUser());
		              dispatch(setRouter(false));
		              Actions.login();
					      });
					    });
            }
          });
        } else {
          dispatch(setRouter(false));
          Actions.login();
        }
      }
    ).catch(
      (error) => {
        if (error) {
          dispatch(setRouter(false));
          Actions.login();
        }
      }
    );
  };
}

exports.logOut = () => {
  return function (dispatch) {
    // remove user from memory of the device
    return AsyncStorage.multiRemove(['userId', 'loginToken'], function(err) {
      return Keychain.resetGenericPassword()
      .then(() => {
        // remove user from state
        dispatch(unauthUser());
        Actions.login();
      });
    });
  };
};

// STILL USED ?
exports.renewPswAct = (userId, newpsw, qst = '0', asw = null) => {
  return function (dispatch) {
    return Keychain.getGenericPassword().then((credentials) => {
      const { password } = credentials;
      const query = {
        grant_type: 'password',
        email: email,
        password: password
      };
      return axios.post(RENEW_PSW, {
        userId,
        newpsw,
        qst,
        asw
      }, {
        headers: { authorization: password }
      })
      .then(
        (response) => {
          if (response) {
            // store the profile in the state
            return true;
          }
        }
      )
      .catch((error) => {});
    }); 
  };
};

// called from RecoverPsw page
exports.recoverPswAct = (email) => {
  return function (dispatch) {
    return axios.post(RECOVER_PSW, { email })
    .then(
      (response) => {
        if (response) {
          // store the profile in the state
          dispatch(addAlert('cool', 'Un mail a été envoyé à cet adresse'));
          return true;
        }
      }
    )
    .catch((error) => {
      if (error) {
        dispatch(addAlert('danger', 'La récuperation du mot de passe n\'était pas possible'));
      }
    });
  };
};

// update the password -> called from parameters page
exports.changePassword = (websocket, psw) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'changeUserPassword', {
      psw
    });
  };
}

exports.verifyFirstConnection = (websocket) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'verifyFirstConnection', {});
  };
}
