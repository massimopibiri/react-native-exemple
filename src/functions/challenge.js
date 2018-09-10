import { establishLimit } from './freeze';
import {
  totalGain,
  challengeCondition
} from './tools';

exports.formatPlayerTheme = (player) => {
  const formatted = [];
  if (player.isSmoker && player.isSmoker === true) {
    formatted.push('tabac');
  }
  if (player.isBadSportsMan && player.isBadSportsMan === true) {
    formatted.push('sport');
  }
  if (player.isBadEater && player.isBadEater === true) {
    formatted.push('nutrition');
  }
  if (player.isStressed && player.isStressed === true) {
    formatted.push('relaxation');
  }
  return formatted;
};

exports.revealFreeSubThemes = (showSubThemes, list, listEngaged) => {
  const listToShow = [];
  if (showSubThemes === true) {
	  for (let i = 0; i < list.length; i ++) {
	  	const index = listEngaged.map((single) => {return single.subTheme}).indexOf(list[i]);
	  	if (index && index < 0) {
	  		listToShow.push(list[i]);
		    if (index >= 0 && listEngaged[index].confirmed === false && age && age > listEngaged[index].maxOld) {
	  	    const age = listEngaged[index].currentTime - new Date(listEngaged[index].date).getTime();
		    	listToShow.push(list[i]);
		    }
	  	}
	  }
  }
  return listToShow;
}

/*
exports.timeRemainning = (date, lasting) => {
  // lasting in timeStamp
  const lastingTS = lasting * 60 * 60 * 1000;
  // ending time
  const endingTime = parseInt(date, 10) + parseInt(lastingTS, 10);
  // current time in timeStamp
  const now = new Date().getTime();
  // time to finish the challenge
  const remaining = endingTime - now;
  return remaining;
};
*/
exports.timer = (time) => {
  const now = Date.now();
  const remaining = time - now;
  if (remaining <= 0) { return 'Defi terminé'; }
  else if (remaining < 60000) { return 'Moins d\'une minute'; }
  else if (remaining < 300000) { return 'Moins de 5 minutes'; }
  else if (remaining < 600000) { return 'Moins de 10 minutes'; }
  else if (remaining < 1200000) { return 'Moins de 20 minutes'; }
  else if (remaining < 1800000) { return 'Moins de 30 minutes'; }
  else if (remaining < 2400000) { return 'Moins de 40 minutes'; }
  else if (remaining < 3000000) { return 'Moins de 50 minutes'; }
  else if (remaining < 3600000) { return 'Il y a 1 heure'; }
  else if (remaining < 7200000) { return 'Il y a 2 heures'; }
  else if (remaining < 10800000) { return 'Il y a 3 heures'; }
  else if (remaining < 14400000) { return 'Il y a 4 heures'; }
  else if (remaining < 18000000) { return 'Il y a 5 heures'; }
  else if (remaining < 21600000) { return 'Il y a 6 heures'; }
  else if (remaining < 25200000) { return 'Il y a 7 heures'; }
  else if (remaining < 86400000) { return 'Hier'; }
  else if (remaining < 172800000) { return 'Il y a 2 jours'; }
  else if (remaining < 259200000) { return 'Il y a 3 jours'; }
  else if (remaining < 345600000) { return 'Il y a 4 jours'; }
  else if (remaining < 432000000) { return 'Il y a 5 jours'; }
  else if (remaining < 518400000) { return 'Il y a 6 jours'; }
  else if (remaining < 604800000) { return 'Il y a 1 semaine'; }
  else if (remaining < 1209600000) { return 'Il y a 2 semaines'; }
  else if (remaining < 1814400000) { return 'Il y a 3 semaines'; }
  else if (remaining < 2592000000) { return 'Il y a 1 mois'; }
  else if (remaining < 5184000000) { return 'Il y a 2 mois'; }
  else if (remaining < 7776000000) { return 'Il y a 3 mois'; }
  else if (remaining >= 7776000000) { return 'Il y a plus de 3 mois'; }
};

exports.last = (time) => {
  let month;
  let days;
  if (time >= 90) {
    month = 'Trois mois';
    days = (time - 90) + ' jours';
  } else if (time >= 60) {
    month = 'Deux mois';
    days = (time - 60) + ' jours';
  } else if (time >= 30) {
    month = 'Un mois';
    days = (time - 30) + ' jours';
  } else if (time >= 0) {
    month = 'Un mois';
    days = time;
  }
  const base = days !== '0 jours' ? (month + ' ' + days) : month; 
  return base;
};

// check if the user played any role in the challenge
exports.checkIfUserPlayedInChallenge = (challenge, userId) => {
	if (
    challenge.challenger !== userId &&
    challenge.opponent !== userId &&
    (!challenge.for || challenge.for.map((element) => { return element.id; }).indexOf(userId) < 0) &&
    (!challenge.both || challenge.both.map((element) => { return element.id; }).indexOf(userId) < 0) &&
    (!challenge.againts || challenge.againts.map((element) => { return element.id; }).indexOf(userId) < 0) &&
    new Date(challenge.finishing).getTime() > new Date(challenge.currentTime).getTime()
  ) {
		return {result: true};
  } else {
  	return {result: false};
  }
};

// check if the freeze has accusers and return the limits of the freeze
exports.checkIfTheFreezeHasAccusers = (challenge = null, freezes = null, userId = null) => {
  // check if a freeze of type 'freeze' is waiting for validation
  const index = freezes && freezes.map((element) => { return element.freezeType; }).indexOf('freeze');
  // check if the freeze...
  if (
    userId
    && index >= 0 // ...has accusers
    && freezes
    && freezes[index]
    && freezes[index].freezeConfirmation !== true // ...is already declared as confirmed (at least 5 accusers of the same opinion)
    && freezes[index].accusers.map((element) => { return element.idAccuser; }).indexOf(userId) < 0 // ...the user still did not express his opinion about the freeze
    && challenge
    && challenge.for
    && challenge.both
    && challenge.againts
  ) {
    // establish the limit of validations for the freeze
    const limitValidations = establishLimit(challenge.for.length, challenge.both.length, challenge.againts.length);
    // store the freeze to validate in the state
    return ({freezein: freezes[index], limitValidations}); // freezeIn and limitValidations
  } else {
    return (null, null);
  }
};

exports.fromHoursToDays = (hr) => {
	if (hr < 24) {
		return hr + ' h';
	} else if (hr >= 24 && hr < 48) {
		return '1 jour';
	} else if (hr >= 48 && hr < 72) {
		return '2 jour';
	} else if (hr >= 72 && hr < 96) {
		return '3 jour';
	} else if (hr >= 96 && hr < 120) {
		return '4 jour';
	} else if (hr >= 120) {
		return '5 jour';
	}
}

exports.engagementOfPlayers = (dataChallenge, callback) => {
	totalGain(dataChallenge, (totalGain) => {
    challengeCondition(totalGain, dataChallenge, (challengeFinished, allPlayersCondition) => {
	    callback(challengeFinished, allPlayersCondition);
    });
	});
}
