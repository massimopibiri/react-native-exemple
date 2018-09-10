export function toogleBox(data) {
	return {
		type: 'TOOGLE_BOX',
		data
	};
}

export function toogleBoxProfil(data) {
	return {
		type: 'TOOGLE_BOXPROFIL',
		data
	};
}

// action to select the right comment to answer to (in dettChallenge page)
export function toogleInput(data, commentId) {
	return {
		type: 'TOOGLE_INPUT',
		data,
		commentId
	};
}

export function valuetopicker(data) {
	return {
		type: 'PICKER_VALUE',
		data
	};
}

export function showModal(showMod) {
	return {
		type: 'SHOW_MODAL',
		showMod
	};
}

export function selectToBuy(title, price) {
	return {
		type: 'SELECT_TO_BUY',
		title,
		price
	};
}

export function savePushNotifAction(actionPush, extraData) {
	return {
		type: 'PUSH_NOTIF_ACTION',
		actionPush,
		extraData
	};
}

export function resetPushNotifAction() {
	return {
		type: 'RESET_PUSH_NOTIF_ACTION'
	};
}
