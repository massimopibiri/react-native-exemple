const defaultState = {
	firstName: '',
	familyName: '',
  email: null,
	picture: '',
	company: '',
	service: '',
	idProgram: null,
	score: '',
	gain: '',
  isSmoker: false,
  isBadEater: false,
  isBadSportsMan: false,
  isStressed: false,
	mychallenges: [],
	gainByMonth: [],
	stats: [],
  nbWellAchieved: 0,
  tabacoTheme: {},
  sportTheme: {},
  foodTheme: {},
  relaxTheme: {},
  byStage: [],
};

module.exports = (state = defaultState, action) => {
	switch (action.type) {
		case 'LOAD_PROFILE':
			return {
				...state,
        firstName: action.data.firstName,
        familyName: action.data.familyName,
        email: action.data.email,
        picture: action.data.image,
        company: action.data.idCompany,
        service: action.data.relatedService,
        idProgram: action.data.idProgram,
        score: action.data.score,
        gain: action.data.gain,
        isSmoker: action.data.isSmoker,
        isBadEater: action.data.isBadEater,
        isBadSportsMan: action.data.isBadSportsMan,
        isStressed: action.data.isStressed,
        gainByMonth: action.data.gainByMonth,
        achieve: action.data.achieve
			};
		case 'LOAD_STATS':
			return {
				...state,
        nbWellAchieved: action.stats.nbWellAchieved,
        tabacoTheme: action.stats.tabacoTheme,
        sportTheme: action.stats.sportTheme,
        foodTheme: action.stats.foodTheme,
        relaxTheme: action.stats.relaxTheme,
        byStage: action.stats.byStage,
			};
		case 'LOAD_SCORE':
			return {
				...state,
				score: action.score
			};
		case 'IMAGE_PROFILE':
			return {
				...state,
				imgProfile: action.img
			};
		default:
			return state;
	}
};
