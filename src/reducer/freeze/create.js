const defaultState = {
	selected: null,
	conmment: null
};

module.exports = (state = defaultState, action) => {
	switch (action.type) {
		case 'SUSPECT_RAISON':
			return {
				...state,
				selected: action.data
			};
		case 'SAVE_COMMENT':
			return {
				...state,
				comment: action.txt
			};
		case 'RESET_REASON':
			return {
				selected: null,
				conmment: null
			};
		default:
			return state;
	}
};
