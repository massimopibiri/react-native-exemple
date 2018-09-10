export function selectInfo(arg) {
	return {
		type: 'SELECT_INFO',
		arg
	};
}

export function showInfo(show) {
	return {
		type: 'SHOW_INFO',
		show
	};
}
