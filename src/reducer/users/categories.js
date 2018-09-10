const initialState = {
	services: [],
	starting: null,
	lasting: null,
	show: true,
	arg: null
};

module.exports = (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_CATEGORIES':
			return {
				...state,
				starting: action.data.starting,
				lasting: action.data.lasting,
				services: action.data.services
			};
		case 'SELECT_ARG':
			return {
				...state,
				arg: action.arg
			};
		case 'SHOW_DETT':
			return {
				...state,
				show: !action.show
			};
		default:
			return state;
	}
};
