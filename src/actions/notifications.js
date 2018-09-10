const socketEmit = require('../socketgate/emit');

exports.selectNotif = (idNot) => {
	return {
		type: 'SELECT_NOTIF',
		idNot
	};
}

exports.loadNotifs = (websocket, target = 'all') => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'loadNotifs', {target});
  };
}

exports.loadNotifsForce = (websocket, target = 'all') => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'loadNotifsForce', {target});
  };
}

exports.selectDest = (title) => {
	return {
		type: 'SELECT_DEST',
		title
	};
}

exports.loadNotifsAll = (data) => {
	return {
		type: 'LOAD_NOTIFS_ALL',
		data
	};
}

exports.loadNotifsPers = (data) => {
	return {
		type: 'LOAD_NOTIFS_PERS',
		data
	};
}

exports.loadNotifsMain = (data) => {
	return {
		type: 'LOAD_NOTIFS_MAIN',
		data
	};
}

exports.setNbNewNotifs = (nb) => {
  return {
    type: 'SET_NB_NOTIFS',
    nb
  };
}
