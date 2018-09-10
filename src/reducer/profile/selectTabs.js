const defaultState = {
	selected: 'theme1'
};

module.exports = (state = defaultState, action) => {
	switch (action.type) {
		case 'SELECT_TAB':
			return {
				selected: action.data
			};
		default:
			return state;
	}
};
