exports.addAlert = (kind, text) => {
	return {
    type: 'ADD_ALERT',
    kind,
    text
	};
};

exports.removeAlert = (id) => {
	return {
    type: 'REMOVE_ALERT',
    id
	};
};

exports.resetAllAlert = () => {
	return {
    type: 'RESET_ALL_ALERTS'
	};
};
