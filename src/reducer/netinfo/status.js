const initialState = {
	status: true
};

module.exports = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NETINFO':
      return {
        ...state,
        status: action.data
      };
		default:
			return state;
	}
};
