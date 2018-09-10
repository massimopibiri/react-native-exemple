export function writeEmail(email) {
	return {
		type: 'WRITE_EMAIL',
		email
	};
}

export function validEmail(status) {
	return {
		type: 'VALID_EMAIL',
		status
	};
}

export function writePsw(psw) {
	return {
		type: 'WRITE_PSW',
		psw
	};
}

export function writeNewPsw(newpsw) {
	return {
		type: 'WRITE_NEWPSW',
		newpsw
	};
}

export function writeSuggestion(sugg) {
	return {
		type: 'WRITE_SUGGESTION',
		sugg
	};
}

export function writeFirstName(name) {
	return {
		type: 'WRITE_FIRSTNAME',
		name
	};
}

export function writeFamilyName(surname) {
	return {
		type: 'WRITE_FAMILYNAME',
		surname
	};
}

export function writeComment(txt) {
	return {
		type: 'WRITE_COMMENT',
		txt
	};
}

export function defaultFirstName(name) {
	return {
		type: 'DEFAULT_FIRSTNAME',
		name
	};
}

export function defaultFamilyName(surname) {
	return {
		type: 'DEFAULT_FAMILYNAME',
		surname
	};
}
