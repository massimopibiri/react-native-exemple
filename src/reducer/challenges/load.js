const defaultState = {
  list: [],
  listPast: [],
  listHorz: [],
  data: {},
  freezes: [],
  notifs: [],
  comments: [],
  selectDef: 'Défis en cours',
  switcher: true,
  authorizeFreeze: true,
  dataPicker: null,
  showPicker: false,
  showctas: false,
  where: 'horiz',
  listChallenges: undefined,
  showSubThemes: false,
  loaded: false
};

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_CHALLENGES':
      return {
        ...state,
        list: action.data,
        where: 'current',
        loaded: true
      };
    case 'RESET_CHALLENGES':
      return {
        ...state,
        list: [],
        loaded: false
      };
    case 'LOAD_PAST_CHALLENGES':
      return {
        ...state,
        listPast: action.data,
        where: 'past',
        loaded: true
      };
    case 'LOAD_HORZ_CHALLENGES':
      return {
        ...state,
        listHorz: action.data,
        where: 'horiz'
      };
    case 'LOAD_SINGLE':
      return {
        ...state,
        data: action.data
      };
    case 'LOAD_SINGLE_FORCE': // force the app to reload comments if the user is in the right page
    	// check if the users is situated in the right page before forcing the reload
    	if (state.data._id === action.data.challengeId) {
	      return {
	        ...state,
	        data: action.data.cont
	      };
    	} else {
    		return state;
    	}
    case 'LOAD_FREEZES':
      return {
        ...state,
        freezes: action.freezes
      };
    case 'LOAD_FREEZES_FORCE': // force the app to reload comments if the user is in the right page
    	// check if the users is situated in the right page before forcing the reload
    	if (state.data._id === action.data.challengeId) {
	      return {
	        ...state,
	        freezes: action.data.cont
	      };
    	} else {
    		return state;
    	}
    case 'LOAD_NOTIFS':
      return {
        ...state,
        notifs: action.notifs
      };
    case 'LOAD_NOTIFS_FORCE': // force the app to reload comments if the user is in the right page
    	// check if the users is situated in the right page before forcing the reload
    	if (state.data._id === action.data.challengeId) {
	      return {
	        ...state,
	        notifs: action.data.cont
	      };
    	} else {
    		return state;
    	}
    case 'LOAD_COMMENTS':
      return {
        ...state,
        comments: action.comments
      };
    case 'RELOAD_COMMENTS': // force the app to reload comments if the user is in the right page
    	// check if the users is situated in the right page before forcing the reload
    	if (state.data._id === action.data.challengeId) {
	      return {
	        ...state,
	        comments: action.data.cont
	      };
    	} else {
    		return state;
    	}
    case 'SELECT_DEF':
      return {
        ...state,
        selectDef: action.title
      };
    case 'CHANGE_SWITCHER':
      return {
        ...state,
        switcher: !action.data
      };
    case 'AUTHORIZE_FREEZE':
      return {
        ...state,
        authorizeFreeze: action.data
      };
    case 'SELECT_FIELD':
      return {
        ...state,
        fieldOfTheBet: action.data,
        showPicker: !action.show
      };
    case 'CHALLENGES_ENGAGED':
      return {
        ...state,
        listChallenges: action.listChallenges,
        showSubThemes: true
      };
    case 'CHALLENGES_ENGAGED_RESET':
      return {
        ...state,
        listChallenges: undefined,
        showSubThemes: false
      };
    default:
      return state;
  }
};
