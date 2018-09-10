const initialState = {
	timeremaining: null,
	pointlimit: null,
	limitedRouter: false,
  executed: false
};

module.exports = (state = initialState, action) => {
	switch (action.type) {
		case 'TIME_REMAINING':
      return {
        ...state,
        timeremaining: action.timeRemaining
      };
		case 'POINT_LIMIT':
      return {
        ...state,
        pointlimit: action.value
      };
		case 'SET_ROUTER':
      return {
        ...state,
        limitedRouter: action.boolean,
        executed: true
      };
		default:
			return state;
	}
};
