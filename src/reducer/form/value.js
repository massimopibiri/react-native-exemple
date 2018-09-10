const defaultState = {
	email: '',
	psw: '',
	surname: '',
	name: '',
	comment: '',
	sugg: '',
	valid: false
};

module.exports = (state = defaultState, action) => {
	switch (action.type) {
		case 'WRITE_EMAIL':
			return {
				...state,
				email: action.email,
				// psw: action.data.psw,
				// valid: action.data.valid
			};
		case 'VALID_EMAIL':
			return {
				...state,
				valid: action.status
			};
		case 'WRITE_PSW':
			return {
				...state,
				psw: action.psw
			};
		case 'WRITE_NEWPSW':
			return {
				...state,
				newpsw: action.newpsw
			};
		case 'WRITE_SUGGESTION':
			return {
				...state,
				sugg: action.sugg
			};
		case 'WRITE_FIRSTNAME':
			return {
				...state,
				name: action.name
			};
		case 'WRITE_FAMILYNAME':
			return {
				...state,
				surname: action.surname
			};
		case 'WRITE_COMMENT':
			return {
				...state,
				comment: action.txt
			};
		case 'DEFAULT_FIRSTNAME':
			return {
				...state,
				defaultName: action.name
			};
		case 'DEFAULT_FAMILYNAME':
			return {
				...state,
				defaultSurname: action.surname
			};
		default:
			return state;
	}
};
