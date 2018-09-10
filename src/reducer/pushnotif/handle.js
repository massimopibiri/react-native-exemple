const defaultState = {
	notificationSignup: null,
	success: false,
	failure: false
};

module.exports = (state = defaultState, action) => {
	switch (action.type) {
		case 'PUSH_SUCCESS':
			return {
				...state,
				notificationSignup: ['token', 'os'],
				success: true,
				failure: false
			};
		case 'PUSH_FAILURE':
			return {
				...state,
				notificationSignup: null,
				success: false,
				failure: true
			};
		default:
			return state;
	}
};
