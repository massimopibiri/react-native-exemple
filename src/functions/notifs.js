import { AsyncStorage } from 'react-native';
import {
  setNbNewNotifs
} from '../actions';

// functions to show the badge number of new notifications in the tabBar notif item
export function handleNewNotifs(dispatch, listNotifs = null, callback) {
  // AsyncStorage.removeItem('receivedNotifs', (err, res) => {});
	// retrieve the list of notifs recorded in the device asyncStorage to check if some of the new notifications has not been received and read already
	AsyncStorage.getItem('receivedNotifs', (error, recordedItems) => {
		const existingList = JSON.parse(recordedItems);
		if (error) {dispatch(setNbNewNotifs(0));}
		let nbToSet = 0;
		if (listNotifs && listNotifs.length > 0) {
			if (existingList && existingList.length > 0) {
				// check if the notifications retrieved from server are new for the device
				for (let i = 0; i < listNotifs.length; i ++) {
					// check if the notif is in the array and if it is newer then the oldest one in the device
					if (existingList.map((single) => {return single._id}).indexOf(listNotifs[i]._id) < 0 && new Date(listNotifs[i].date).getTime() > new Date(existingList[0].date).getTime()) {
						nbToSet ++;
					}
				}
				dispatch(setNbNewNotifs(nbToSet));
			} else {
				dispatch(setNbNewNotifs(listNotifs.length));
			}
		} else {
			dispatch(setNbNewNotifs(0));
		}
	});
}
// function to mark notifs as red to avoid the badge number
export function markNotifs(dispatch, listNotifs = null, callback) {
	// retrieve the list of old notifications
	AsyncStorage.getItem('receivedNotifs', (error, recordedItems) => {
		const recordedTemp = JSON.parse(recordedItems);
    if (listNotifs && listNotifs.length > 0) {
    	if (recordedTemp && recordedTemp.length > 0) {
    		// get the last 20 items in local memory
    		const existingList = recordedTemp.slice(0, 20);
    		let listToSave = [];
        for (let i = 0; i < listNotifs.length; i ++) {
					if (existingList.map((single) => {return single._id;}).indexOf(listNotifs[i]._id) < 0 && new Date(listNotifs[i].date).getTime() > new Date(existingList[0].date).getTime()) {
						listToSave.push(listNotifs[i]);
					}
        }
        const arrayToSave = listToSave.concat(existingList);
				dispatch(setNbNewNotifs(0));
        AsyncStorage.setItem('receivedNotifs', JSON.stringify(arrayToSave), (error, result) => {
        	callback();
        });
    	} else {
				dispatch(setNbNewNotifs(0));
				AsyncStorage.setItem('receivedNotifs', JSON.stringify(listNotifs), (error, result) => {
					callback();
				});
    	}
    } else {
			dispatch(setNbNewNotifs(0));
		}
	});
}

// mark a single notif as red when clicked
export function markSingleNotif(id, date, callback) {
	// retrieve the list of old notifications
	AsyncStorage.getItem('receivedNotifs', (error, recordedItems) => {
		let existingList = JSON.parse(recordedItems);
		if (existingList) {
			// get the position of the notif in the array
			const index = existingList.map((single) => {return single._id}).indexOf(id);
			// if the notification is already in the local storage
			if (existingList.map((single) => {return single._id}).indexOf(id) >= 0) {
				// mark the notification as read
				existingList[index].clicked = true;
				// save the updated list
				AsyncStorage.setItem('receivedNotifs', JSON.stringify(existingList), (error, result) => {
					callback();
				});
			// if the notif does not exist in the local storage
			} else {
				existingList.push({_id: id, date: date, clicked: true});
				// save the updated list
				AsyncStorage.setItem('receivedNotifs', JSON.stringify(existingList), (error, result) => {
					callback();
				});
			}
		}
  });
}

const calcTime = (date) => {
	const hours = new Date(date).getHours() <= 9 ? '0' + new Date(date).getHours() : new Date(date).getHours();
	const minutes = new Date(date).getMinutes() <= 9 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes();
	return hours + 'h' + minutes;
};

exports.timerNotifs = (current, date) => {
  const remaining = current - new Date(date).getTime();
  if (remaining < 60000) { return 'Il y a 1 minute'; }
  else if (remaining < 120000) { return 'Il y a 2 minute'; }
  else if (remaining < 180000) { return 'Il y a 3 minute'; }
  else if (remaining < 240000) { return 'Il y a 4 minute'; }
  else if (remaining < 300000) { return 'Il y a 5 minutes'; }
  else if (remaining < 600000) { return 'Il y a 10 minutes'; }
  else if (remaining < 900000) { return 'Il y a 15 minutes'; }
  else if (remaining < 1200000) { return 'Il y a 20 minutes'; }
  else if (remaining < 1500000) { return 'Il y a 25 minutes'; }
  else if (remaining < 1800000) { return 'Il y a 30 minutes'; }
  else if (remaining < 2100000) { return 'Il y a 35 minutes'; }
  else if (remaining < 2400000) { return 'Il y a 40 minutes'; }
  else if (remaining < 2700000) { return 'Il y a 45 minutes'; }
  else if (remaining < 3000000) { return 'Il y a 50 minutes'; }
  else if (remaining < 3300000) { return 'Il y a 55 minutes'; }
  else if (remaining < 3600000) { return 'Il y a 1 heure'; }
  else if (remaining < 7200000) { return 'Il y a 2 heures'; }
  else if (remaining < 10800000) { return 'Il y a 3 heures'; }
  else if (remaining < 14400000) { return 'Il y a 4 heures'; }
  else if (remaining < 18000000) { return 'Il y a 5 heures'; }
  else if (remaining < 21600000) { return 'Il y a 6 heures'; }
  else if (remaining < 25200000) { return 'Il y a 7 heures'; }
  else if (remaining < 86400000) { return 'Hier à ' + calcTime(date); }
  else if (remaining < 172800000) { return 'Il y a 2 jours à ' + calcTime(date); }
  else if (remaining < 259200000) { return 'Il y a 3 jours à ' + calcTime(date); }
  else if (remaining < 345600000) { return 'Il y a 4 jours à ' + calcTime(date); }
  else if (remaining < 432000000) { return 'Il y a 5 jours à ' + calcTime(date); }
  else if (remaining > 432000001) { return 'Il y a plus de 6 jours'; }
};

