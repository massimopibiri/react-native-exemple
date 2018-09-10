import {
	StyleSheet
} from 'react-native';
import {
  white,
  color1,
  pS
} from '../../global/variables';

const nbNotifs = 20;

module.exports = StyleSheet.create({
  navBar: {
    borderColor: 'transparent',
    paddingTop: 10,
    elevation: 0
  },
	navBarTitle:{
    color: white,
    fontSize: pS,
    alignSelf: 'center',
    backgroundColor: 'transparent',
	},
  back: {
    width: 23,
    height: 23,
    paddingRight: 20,
    paddingVertical: 10
  },
  burger: {
    width: 22,
    height: 22,
    paddingRight: 15
  },
  tabIcon: {
    width: 30,
    height: 30,
    position: 'relative'
  },
  nbNewNotifs: {
  	position: 'absolute',
  	top: -5,
  	right: -7,
  	alignItems: 'center',
  	justifyContent: 'center',
  	backgroundColor: color1,
  	height: nbNotifs,
  	borderRadius: nbNotifs / 2,
  	paddingHorizontal:7
  },
  nbNewNotifsTxt: {
  	color: white,
  	textAlign: 'center',
  	backgroundColor: 'transparent'
  }
});
