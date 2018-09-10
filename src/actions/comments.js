// initialize socket.io to communicate with the server
const socketEmit = require('../socketgate/emit');

exports.loadComments = (data) => {
	return {
        type: 'RELOAD_COMMENTS',
        data
	};
}

exports.sendComment = (websocket, comment, challengeId, commentId) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'recComment', {
      comment,
      challengeId,
      commentId
    });
  };
}
