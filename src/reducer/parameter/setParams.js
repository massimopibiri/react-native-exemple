const defaultState = {
	isSmoker: true,
	isBadEater: true,
	isBadSportsMan: true,
	isStressed: true
};

module.exports = (state = defaultState, action) => {
	switch (action.type) {
		case 'SET_SMOKER':
			return {
				...state,
				isSmoker: !action.data
			};
		case 'SET_BADEATER':
			return {
				...state,
				isBadEater: !action.data
			};
		case 'SET_BADSPORTSMAN':
			return {
				...state,
				isBadSportsMan: !action.data
			};
		case 'SET_STRESSED':
			return {
				...state,
				isStressed: !action.data
			};
		default:
			return state;
	}
};
