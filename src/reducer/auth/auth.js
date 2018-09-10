const defaultState = {
	userId: undefined,
	loggedIn: false,
	errorText: undefined
};

module.exports = (state = defaultState, action) => {
	switch (action.type) {
		case 'AUTH_USER':
			return {
				userId: action.userId,
				loggedIn: true,
        errorText: undefined
			};
		case 'UNAUTH_USER':
			return {
				userId: undefined,
				loggedIn: false,
        errorText: action.error
			};
		case 'VALID_TYPING':
			return {
				loggedIn: false,
        errorText: undefined
			};
		default:
			return state;
	}
};
