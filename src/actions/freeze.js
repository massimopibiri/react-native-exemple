const socketEmit = require('../socketgate/emit');

exports.suspectRaison = (data) => {
	return {
		type: 'SUSPECT_RAISON',
		data
	};
}

exports.saveComment = (txt) => {
	return {
		type: 'SAVE_COMMENT',
		txt
	};
}

exports.resetReason = (txt) => {
	return {
		type: 'RESET_REASON',
		txt
	};
}

exports.authorizeFreeze = (data) => {
  return {
        type: 'AUTHORIZE_FREEZE',
        data
  };
};

exports.validateFreeze = (websocket, decision, id, accusedId, challengeId) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'validateFreeze', {
      decision,
      id,
      accusedId,
      challengeId
    });
  };
}
/*
exports.validateDetFreeze = (websocket, decision, id, accusedId, challengeId) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'validateDetFreeze', {
      decision,
      id,
      accusedId,
      challengeId
    });
  };
}
*/
exports.registerFreeze = (websocket, data) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'saveFreeze', data);
  };
}
