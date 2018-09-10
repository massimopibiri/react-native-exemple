const initialState = {
	actionPush: null,
	extraData: null
};

module.exports = (state = initialState, action) => {
	switch (action.type) {
		case 'PUSH_NOTIF_ACTION':
      return {
        ...state,
        actionPush: action.actionPush,
        extraData: action.extraData
      };
		case 'RESET_PUSH_NOTIF_ACTION':
      return {
        ...state,
        actionPush: null,
        extraData: null
      };
		default:
			return state;
	}
};
