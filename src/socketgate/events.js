import { Actions } from 'react-native-router-flux';
import {
  addAlert,
  authorizeFreeze,
  challengesIsEngagedIn,
  getAllChallenges,
  getHorzChallenges,
  getMainForce,
  imageProfile,
  loadAllPlayers,
  loadCategories,
  loadChallenges,
  loadComments,
  loadHorzChallenges,
  loadNotifsForce,
  loadNotifsAll,
  loadNotifsMain,
  loadNotifsPers,
  loadPastChallenges,
  loadProfile,
  loadScore,
  loadStats,
  playersAndScore,
  pointLimit,
  saveSingleChallenge,
  saveSingleChallengeForce,
  saveFreezesOfChals,
  saveFreezesOfChalsForce,
  saveNotifsOfChals,
  saveNotifsOfChalsForce,
  saveCommentsOfChals,
  saveCommentsOfChalsForce,
  setSmoker,
  setBadEater,
  setBadSportsMan,
  setRouterExt,
  setStressed,
  storeBonus,
  storeCash,
  storeShop,
  storeWallet,
  timeRemaining,
  totalAmount,
  writePsw,
  writeSuggestion,
} from '../actions';
import {
  markNotifs,
  handleNewNotifs
} from '../functions/notifs';

exports = module.exports = (io, store) => {
  const state = store.getState();

  /* ----------- BEHAVIOR ROUTER -------------------- */

  io.on('routerForce', (data) => {
  	if (data && data.cont && data.cont.finished) {
      store.dispatch(setRouterExt(data.cont.finished));
      Actions.tabbar();
  	}
  });

  io.on('badgeNotifs', (data) => {
    // resgister the notifications in the asyncStorage to avoid undesired tabbar badge notification
    if (data && data.listNotifsBadge && data.listNotifsBadge.length > 0) {
    	const notifsForTabbar = data.listNotifsBadge.map((single) => {return {_id: single._id, date: single.date};});
      handleNewNotifs(store.dispatch, notifsForTabbar);
    }
  });

  /* ----------- MAIN PAGE -------------------- */

  io.on('getMainUserInfosRes', (data) => {
    store.dispatch(loadProfile(data.userData));
  });

  io.on('getMainChallengesRes', (data) => {
    store.dispatch(loadHorzChallenges(data.listChallenges));
  });

  io.on('getMainNotifsRes', (data) => {
    store.dispatch(loadNotifsMain(data.listNotifs));
  });

  /* ----------- DETAIL CHALLENGE PAGE -------------------- */

  io.on('challengePageDetails', (data) => {
    store.dispatch(saveSingleChallenge(data.challenge));
  });

  io.on('challengePageDetailsForce', (data) => {
  	// call server to update the list of challenges
  	store.dispatch(getMainForce(io));
  	store.dispatch(getAllChallenges(io, 'current', 'personal', 30));
  	// store the new data in the state
    store.dispatch(saveSingleChallengeForce(data));
  });

  io.on('challengePageFreezes', (data) => {
    store.dispatch(saveFreezesOfChals(data.freezes));
  });

  io.on('challengePageFreezesForce', (data) => {
    store.dispatch(saveFreezesOfChalsForce(data));
  });

  io.on('challengePageNotifs', (data) => {
    store.dispatch(saveNotifsOfChals(data.notifs));
  });

  io.on('challengePageNotifsForce', (data) => {
    store.dispatch(saveNotifsOfChalsForce(data));
  });

  io.on('challengePageComments', (data) => {
    store.dispatch(saveCommentsOfChals(data.comments));
  });

  io.on('challengePageCommentsForce', (data) => {
    store.dispatch(loadComments(data));
  });

  io.on('getScoreRes', (data) => {
    store.dispatch(loadScore(data.score));
  });

  io.on('forceAllNotifs', (data) => {
    // empty the freeze that had to be validate
  	store.dispatch(loadNotifsForce(io, 'getMain'));
  	store.dispatch(loadNotifsForce(io, 'personal'));
  	store.dispatch(loadNotifsForce(io, 'all'));
  });


  // forced to reload all lists of notifs because some news
  io.on('generalForceAll', (data) => {
  	Actions.refresh();
  	store.dispatch(getMainForce(io));
  	store.dispatch(getAllChallenges(io, 'current', 'personal', 30));
  	store.dispatch(getAllChallenges(io, 'finished', 'personal', 30));
  	store.dispatch(getAllChallenges(io, 'current', 'all', 30));
  	store.dispatch(getAllChallenges(io, 'finished', 'all', 30));
  	store.dispatch(loadNotifsForce(io, 'personal'));
  	store.dispatch(loadNotifsForce(io, 'all'));
  });

  /* ----------- ALL CHALLENGE PAGE -------------------- */

  io.on('allChallengesRes', (data) => {
    if (data.allChallenges && data.par.selectDef === 'finished') {
      store.dispatch(loadPastChallenges(data.allChallenges));
    } else if (data.allChallenges && data.par.selectDef === 'current') {
      store.dispatch(loadChallenges(data.allChallenges));
    }
  });

  io.on('opponentChallengesRes', (data) => {
    store.dispatch(loadChallenges(data.allChallenges));
  });

  /* ----------- ACCEPTANCE PAGE -------------------- */

  io.on('acceptanceRes', (data) => {
  	Actions.home();
  	store.dispatch(getMainForce(io));
  	store.dispatch(getAllChallenges(io, 'current', 'all', 30));
  	store.dispatch(getAllChallenges(io, 'current', 'personal', 30));
  	store.dispatch(loadNotifsForce(io, 'personal'));
  	store.dispatch(loadNotifsForce(io, 'all'));
  });

  /* ----------- BETTING PAGE -------------------- */

  io.on('checkpointsRes', (data) => {
    store.dispatch(pointLimit(data.result));
  });

  /* ----------- BONUS PAGE -------------------- */

  io.on('currentScoreRes', (data) => {
    store.dispatch(storeBonus(data.score, data.firstActions));
  });

  /* ----------- CASH PAGE -------------------- */

  io.on('getCashDataRes', (data) => {
    store.dispatch(storeCash(data.result));
  });

  /* ----------- CHALLENGE PAGE -------------------- */

  io.on('getAllPlayersRes', (data) => {
    // write the result of the api call in the internat state
    store.dispatch(loadAllPlayers(data.programUsers));
  });

  io.on('checkIfOppEngagedRes', (data) => {
    // write the result of the api call in the internat state
    store.dispatch(challengesIsEngagedIn(data.listChallenges));
  });


  /* ----------- DESTINATION FREEZE PAGE -------------------- */

  io.on('challengeToFreezeRes', (data) => {
    store.dispatch(loadChallenges(data.challengesWithNames));
  });

  /* ----------- DETAIL FREEZE PAGE -------------------- */

  io.on('validateDetFreezeRes', (data) => {
    // empty the freeze that had to be validate
    Actions.pop();
    store.dispatch(loadNotifsAll(data.notifs));
  });

  /* ----------- DETAIL NOTIFS PAGE -------------------- */

  io.on('loadNotifsRes', (data) => {
    if (data.target === 'personal') {
      store.dispatch(loadNotifsPers(data.notifs));
      // register the notifications in the asyncStorage to avoid undesired tabbar badge notification
      if (data && data.notifs && data.notifs.length > 0) {
      	const notifsForTabbar = data.notifs.map((single) => {return {_id: single._id, date: single.date};});
        markNotifs(store.dispatch, notifsForTabbar, () => {});
      }
    } else if (data.target === 'all') {
      store.dispatch(loadNotifsAll(data.notifs));
      // register the notifications in the asyncStorage to avoid undesired tabbar badge notification
      if (data && data.notifs && data.notifs.length > 0) {
      	const notifsForTabbar = data.notifs.map((single) => {return {_id: single._id, date: single.date};});
        markNotifs(store.dispatch, notifsForTabbar, () => {});
      }
    } else if (data.target === 'getMain') {
    	store.dispatch(loadNotifsMain(data.notifs));
    }
  });

  io.on('loadNotifsResForce', (data) => {
    if (data.target === 'personal') {
      store.dispatch(loadNotifsPers(data.notifs));
    } else if (data.target === 'all') {
      store.dispatch(loadNotifsAll(data.notifs));
    } else if (data.target === 'getMain') {
    	store.dispatch(loadNotifsMain(data.notifs));
    }
  });

  /* ----------- END CHALLENGE PAGE -------------------- */

  io.on('createChallengeRes', (data) => {
    store.dispatch(loadHorzChallenges(data.listChallenges));
  	store.dispatch(loadNotifsForce(io, 'getMain'));
    Actions.home();
  });

  // force the update of the profile of the opponent
  io.on('forcedAll', (data) => {
  	store.dispatch(getMainForce(io));
  	store.dispatch(getAllChallenges(io, 'current', 'all', 30));
  	store.dispatch(getAllChallenges(io, 'current', 'personal', 30));
  	store.dispatch(loadNotifsForce(io, 'personal'));
  	store.dispatch(loadNotifsForce(io, 'all'));
  });

  /* ----------- GENERAL CONFIGURATION PAGE -------------------- */

  io.on('setSingleThemesRes', (data) => {
  });

  /* ----------- INTRO FREEZE PAGE -------------------- */

  io.on('checkIfExistsRes', (data) => {
    store.dispatch(authorizeFreeze(data.result));
  });

  /* ----------- LASTING PAGE -------------------- */

  io.on('checkLimitRes', (data) => {
    store.dispatch(timeRemaining(data.timeRemaining));
  });

  /* ----------- PARAMETERS PAGE -------------------- */

  io.on('getAllParametersRes', (data) => {
    // initialize the values of the parameters
    store.dispatch(imageProfile(data.image));
    store.dispatch(writeSuggestion(''));
    store.dispatch(writePsw(''));
    store.dispatch(setSmoker(!data.isSmoker));
    store.dispatch(setBadEater(!data.isBadEater));
    store.dispatch(setBadSportsMan(!data.isBadSportsMan));
    store.dispatch(setStressed(!data.isStressed));
  });

  io.on('changeUserPasswordRes', (data) => {
    // show the confirmation message
    store.dispatch(addAlert('cool', 'Your password has been successfully updated'));
  });

  io.on('sendSuggestionRes', (data) => {
    store.dispatch(addAlert('cool', 'Your suggestion has been sent to the administrator'));
  });

  /* ----------- PLAYERS PAGE -------------------- */

  io.on('getServicesRes', (data) => {
    store.dispatch(loadCategories(data));
  });

  /* ----------- PREVIEW IMG PAGE -------------------- */

  io.on('setAvatarRes', (data) => {
    store.dispatch(addAlert('cool', 'Your profile image has been updated'));
  });

  /* ----------- PROFILE PAGE -------------------- */

  io.on('getProfileBasicRes', (data) => {
    store.dispatch(loadProfile(data.userData));
  });

  io.on('getProfileStatsRes', (data) => {
    store.dispatch(loadStats(data.statistics));
  });

  /* ----------- SHOP PAGE -------------------- */

  io.on('conditionInEurosRes', (data) => {
    store.dispatch(storeShop(data.result));
  });

  io.on('buyRes', (data) => {
    store.dispatch(storeShop(data.result));
  });

  /* ----------- SHOW PLAYERS PAGE -------------------- */

  io.on('selectedPlayersRes', (data) => {
    store.dispatch(loadAllPlayers(data.listUsers));
  });

  /* ----------- TEMPORARY PAGE -------------------- */

  io.on('verifyFirstConnectionRes', (data) => {
    if (data && data.userData && !data.userData.program) {
      Actions.temporary();
    // verify if it is the first connection for this user
    } else if (data.userData && data.userData.firstConnectionDone && data.userData.firstConnectionDone === true) {
      // redirect to main page
      Actions.tabbar();
    } else {
      // redirect to the first configuration
      Actions.slide1();
    }
  });

  /* ----------- WALLET PAGE -------------------- */

  io.on('programStatus', (data) => {
    store.dispatch(storeWallet(data.programStatus));
  });

  io.on('currentScoreAndAmount', (data) => {
    store.dispatch(totalAmount(data.scoreAndAmount));
  });

  io.on('totalScoreAndRanking', (data) => {
    store.dispatch(playersAndScore(data));
  });


  /* ----------- WARNINGS --------- */
/*
  io.on('error', (res) => {
    store.dispatch(addAlert('danger', res.message));
  });
*/
};
