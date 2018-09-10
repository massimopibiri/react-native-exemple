const socketEmit = require('../socketgate/emit');

exports.timeRemaining = (timeRemaining) => {
	return {
		type: 'TIME_REMAINING',
		timeRemaining
	};
}

exports.pointLimit = (value) => {
	return {
		type: 'POINT_LIMIT',
		value
	};
}

exports.checkpoints = (websocket, opponentId = null) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'checkpoints', {
      opponentId
    });
  };
}

exports.checklimit = (websocket) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'checklimit', {});
  };
}
