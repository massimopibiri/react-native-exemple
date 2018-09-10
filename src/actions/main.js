// initialize socket.io to communicate with the server
const socketEmit = require('../socketgate/emit');

exports.getMain = (websocket) => { // ok
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'getMain', {});
  };
};

exports.getMainForce = (websocket) => { // ok
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'getMainForce', {});
  };
};
/*
export function loadMain(data) {
	return {
		type: 'LOAD_MAIN',
		data
	};
}
*/
