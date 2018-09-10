const initialState = {
	users: [],
	error: null
};

module.exports = (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_USERS':
			return {
				users: action.data
			};
		default:
			return state;
	}
};
