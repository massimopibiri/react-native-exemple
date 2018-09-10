const defaultState = {
	data: null,
	gain: null,
	byMonth: [],
	score: null,
	done: null,
  stagesRef: null,
  totalBudget: null,
  currentPrice: null,
  programStatus: null,
  totalNbPlayers: null,
  price: {}
};

module.exports = (state = defaultState, action) => {
	switch (action.type) {
    case 'STORE_WALLET':
      return {
        ...state,
        price: action.data.price,
        program: action.data.program,
        programStatus: action.data.programStatus
      };
    case 'TOTAL_AMOUNT':
      return {
        ...state,
        totalAmount: action.data.totalAmount,
        currentScore: action.data.currentScore
      };
    case 'PLAYERS_AND_SCORE':
      return {
        ...state,
        players: action.data.listUsers,
        totalScore: action.data.totalScore
      };
		case 'STORE_SHOP':
			return {
        ...state,
        gain: action.data.wallet.gain,
        products: action.data.products
      };
		case 'STORE_BONUS':
			return {
        ...state,
        score: action.score,
        done: action.firstActions
      };
    case 'RESET_PROGRAMSTATUS':
      return {
        ...state,
        programStatus: null
       };
    case 'STORE_CASH':
      return {
        ...state,
        stagesRef: action.data.stagesRef,
        totalBudget: action.data.totalBudget,
        currentPrice: action.data.currentPrice,
        programStatus: action.data.programStatus,
        totalNbPlayers: action.data.totalNbPlayers
       };
		default:
			return state;
	}
};
