const defaultState = {
	show: false,
	arg: 'tabac'
};

module.exports = (state = defaultState, action) => {
	switch (action.type) {
		case 'SELECT_INFO':
			return {
        ...state,
        arg: action.arg
      };
		case 'SHOW_INFO':
			return {
        ...state,
        show: action.show
      };
		default:
			return state;
	}
};
