const socketEmit = require('../socketgate/emit');

exports.storeWallet = (data) => {
	return {
		type: 'STORE_WALLET',
		data
	};
}

exports.totalAmount = (data) => {
	return {
		type: 'TOTAL_AMOUNT',
		data
	};
}

exports.playersAndScore = (data) => {
	return {
		type: 'PLAYERS_AND_SCORE',
		data
	};
}

exports.storeShop = (data) => {
	return {
		type: 'STORE_SHOP',
		data
	};
}

exports.storeBonus = (score, firstActions) => {
	return {
		type: 'STORE_BONUS',
		score,
		firstActions
	};
}

exports.storeCash = (data) => {
	return {
		type: 'STORE_CASH',
		data
	};
}

exports.resetProgramStatus = () => {
	return {
		type: 'RESET_PROGRAMSTATUS'
	};
}

exports.currentScore = (websocket) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'currentScore', {});
  };
}

exports.getCashData = (websocket) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'getCashData', {});
  };
}

exports.conditionInEuros = (websocket) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'conditionInEuros', {});
  };
}

exports.buy = (websocket, title, price) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'buy', {title, price});
  };
}

exports.loadWallet = (websocket) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'loadWallet', {});
  };
}
