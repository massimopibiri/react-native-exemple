// initialize socket.io to communicate with the server
const socketEmit = require('../socketgate/emit');

exports.loadSingleChallenge = (websocket, idChallenge) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'challengeLoadSingle', {idChallenge});
  };
};

exports.bet = (websocket, challengeId, field, userId, bet = null) => { // ok
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'bet', {
      challengeId,
      field,
      userId,
      bet
    });
    // empty the value of the picker in the state and hide the picker
    dispatch(selectFieldInt(' ', true));
  };
};

exports.getAllChallenges = (websocket, selectDef, switcher, nb = null) => { // ok
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'allChallenges', {
      selectDef,
      switcher,
      nb
    });
  };
};

exports.getOpponentChallenges = (websocket, opponent, theme) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'opponentChallenges', {
      opponent,
      theme
    });
  };
};

exports.getHorzChallenges = (websocket, selectDef, switcher, nb = null) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'horzChallenges', {
      selectDef,
      switcher,
      nb
    });
  };
};

exports.acceptance = (websocket, challengeId, amount, challenger, opponent, command) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'acceptance', {
      challengeId,
      amount,
      challenger,
      opponent,
      command
    });
  };
};

exports.createChallenge = (websocket, fielded, selOpponent, selTheme, selSubTheme, selTime, selPoints) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'createChallenge', {
      fielded,
      selOpponent,
      selTheme,
      selSubTheme,
      selTime,
      selPoints
    });
  };
};

exports.checkIfOppEngaged = (websocket, idProgram, selOpponent) => {
  return function (dispatch) {
    socketEmit(websocket, 'checkIfOppEngaged', {
      idProgram,
      selOpponent
    });
  };
};



exports.checkIfExists = (websocket) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'checkIfExists', {});
  };
};

exports.checkIfExistsForce = (websocket) => {
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'checkIfExistsForce', {});
  };
};

exports.challengeToFreeze = (websocket) => { // ok
  return function (dispatch) {
    // send request to server
    socketEmit(websocket, 'challengeToFreeze', {});
  };
};

exports.saveSingleChallenge = (data) => {
  return {
    type: 'LOAD_SINGLE',
    data
  };
};

exports.saveSingleChallengeForce = (data) => {
  return {
    type: 'LOAD_SINGLE_FORCE',
    data
  };
};

exports.saveFreezesOfChals = (freezes) => {
  return {
    type: 'LOAD_FREEZES',
    freezes
  };
};

exports.saveFreezesOfChalsForce = (data) => {
  return {
    type: 'LOAD_FREEZES_FORCE',
    data
  };
};

exports.saveNotifsOfChals = (notifs) => {
  return {
    type: 'LOAD_NOTIFS',
    notifs
  };
};

exports.saveNotifsOfChalsForce = (data) => {
  return {
    type: 'LOAD_NOTIFS_FORCE',
    data
  };
};

exports.saveCommentsOfChals = (comments) => {
    return {
        type: 'LOAD_COMMENTS',
        comments
    };
};

exports.loadChallenges = (data) => {
    return {
        type: 'LOAD_CHALLENGES',
        data
    };
};

exports.resetChallenges = () => {
    return {
        type: 'RESET_CHALLENGES'
    };
};

exports.loadPastChallenges = (data) => {
  return {
    type: 'LOAD_PAST_CHALLENGES',
    data
  };
};

exports.loadHorzChallenges = (data) => { // o=> k
  return {
    type: 'LOAD_HORZ_CHALLENGES',
    data
  };
};

exports.changeSwitch = (data) => {
	return {
    type: 'CHANGE_SWITCHER',
    data
	};
};

exports.challengesIsEngagedIn = (listChallenges) => {
	return {
    type: 'CHALLENGES_ENGAGED',
    listChallenges
	};
};

exports.challengesIsEngagedInReset = () => {
	return {
    type: 'CHALLENGES_ENGAGED_RESET'
	};
};

const selectFieldInt = (data, show) => {
  return {
    type: 'SELECT_FIELD',
    data,
    show
  };
};

exports.selectField = (data, show) => {
  return {
    type: 'SELECT_FIELD',
    data,
    show
  };
};
