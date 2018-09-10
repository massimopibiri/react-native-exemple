const defaultState = {
	itemsAll: [],
	itemsPers: [],
	itemsMain: [],
	selectNot: 'Mon reseau',
	nbTab: 1,
	selectedTab: 'Mon reseau',
	nbNewNotifs: null
};

module.exports = (state = defaultState, action) => {
	switch (action.type) {
		case 'SELECT_NOTIF':
			return {
				...state,
				selectNot: action.idNot
			};
		case 'RESET_NOTIF':
			return {
				...state,
				selectNot: null
			};
		case 'SELECT_DEST':
			return {
				...state,
				selectedTab: action.title
			};
		case 'LOAD_NOTIFS_ALL':
			return {
				...state,
				itemsAll: action.data
			};
		case 'LOAD_NOTIFS_PERS':
			return {
				...state,
				itemsPers: action.data
			};
		case 'LOAD_NOTIFS_MAIN':
			return {
				...state,
				itemsMain: action.data
			};
		case 'SET_NB_NOTIFS':
			return {
				...state,
				nbNewNotifs: action.nb
			};
		default:
			return state;
	}
};
