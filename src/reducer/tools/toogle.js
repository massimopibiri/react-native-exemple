const initialState = {
	show: false,
	showInput: false,
	commentId: '0',
	showMod: false,
	selectedToBuy: null
};

module.exports = (state = initialState, action) => {
	switch (action.type) {
		case 'TOOGLE_BOX':
      return {
        ...state,
        show: !action.data
      };
		case 'TOOGLE_BOXPROFIL':
			return {
				...state,
				show: !action.data
			};
		case 'TOOGLE_INPUT':
			return {
				...state,
				showInput: !action.data,
				commentId: action.commentId
			};
		case 'SHOW_MODAL':
			return {
				...state,
				showMod: !action.showMod
			};
		case 'SELECT_TO_BUY':
			return {
				...state,
				selectedToBuy: {
					title: action.title,
					price: action.price
				}
			};
		default:
			return state;
	}
};
