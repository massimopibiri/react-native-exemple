const socketEmit = require('../socketgate/emit');

exports.allPlayers = (websocket, idProgram) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'getAllPlayers', {idProgram});
  };
}

exports.getServices = (websocket) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'getServices', {});
  };
}

exports.selectedPlayers = (websocket, arg, subArg) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'selectedPlayers', {arg, subArg});
  };
}

exports.loadAllPlayers = (data) => {
	return {
		type: 'LOAD_USERS',
		data
	};
}

exports.loadCategories = (data) => {
	return {
		type: 'LOAD_CATEGORIES',
		data
	};
}

exports.selectArg = (arg) => {
	return {
		type: 'SELECT_ARG',
		arg
	};
}

exports.showDett = (show) => {
	return {
		type: 'SHOW_DETT',
		show
	};
}
