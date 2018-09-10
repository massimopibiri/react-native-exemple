import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	pS,
	white,
	h3,
	pB,
	color7,
	pM,
	padTop,
	color1,
	h1
} from '../../global/variables';

const { width, height } = Dimensions.get('window');
const themeIconWidth = 48;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: padTop,
    paddingBottom: 50
  },
  fond: {
  	position: 'absolute',
  	top: -55,
  	left: 20,
  	width: width - 40,
  	height: width - 40,
  	resizeMode: 'contain',
  	opacity: 0.3
  },
  logoBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    top: 30,
    left: 20
  },
  logo: {
  	width: 55,
  	height: 55
  },
  headBox: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginHorizontal: 20,
    marginTop: 25
  },
  textgain: {
    width: 90,
    fontSize: pS - 1,
    marginTop: 10,
    alignItems: 'flex-start',
    color: white,
    backgroundColor: 'transparent'
  },
  textgainVal: {
    width: 90,
    fontSize: h3,
    marginBottom: 10,
    alignItems: 'flex-start',
    color: white,
    fontWeight: '700',
    backgroundColor: 'transparent'
  },
  btnChallenge: {
  	width: 140,
  	height: 140,
  	marginTop: 35
  },
  textAchieve: {
    width: 110,
    fontSize: pS - 1,
    marginTop: 10,
    alignItems: 'flex-end',
    textAlign: 'right',
    color: white,
    backgroundColor: 'transparent'
  },
  textAchieveVal: {
    width: 90,
    fontSize: h3,
    marginBottom: 10,
    alignSelf: 'flex-end',
    textAlign: 'right',
    color: white,
    fontWeight: '700',
    backgroundColor: 'transparent'
  },
  textAchievePlus: {
    width: 90,
    fontSize: pB,
    marginBottom: 10,
    alignItems: 'flex-start',
    color: white,
    fontWeight: '700',
    backgroundColor: 'transparent'
  },
  otherChallsBox: {
  	paddingHorizontal: 25,
  	marginTop: 40,
  	marginBottom: 20
  },
  centerTxt: {
  	alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  btnTxt: {
    color: white,
    backgroundColor: 'transparent'
  },
  btn: {
    backgroundColor: color1,
    height: 80,
    borderRadius: 12,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTxt2: {
    color: white,
    backgroundColor: 'transparent',
  	fontSize: h1,
  	fontWeight: '300',
  	marginTop: -2
  },
  right: {
  	width: 20,
  	height: 20,
  	marginLeft: 15
  },
  // for the carousel of challenges
  challengesBox: {
  	paddingTop: 30,
    alignItems: 'stretch',
  },
  challengesHeader: {
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	paddingHorizontal: 26
  },
  currentChals: {
  	fontSize: pS,
  	color: white,
    backgroundColor: 'transparent'
  },
  allChalsBox: {
  	borderBottomWidth: 2,
  	borderBottomColor: color7
  },
  allChals: {
  	fontSize: pS,
  	color: white,
  	marginBottom: -5,
    backgroundColor: 'transparent'
  },
  chalWarning: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10,
    width: width,
    paddingTop: 25
  },
  emptyBoard: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  noChals: {
    fontSize: pM,
  	paddingVertical: 30,
    color: white,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  genInfosLeft: {
  	position: 'absolute',
  	top: 0,
  	left: 0
  },
  genInfosRight: {
  	position: 'absolute',
  	top: 0,
  	right: 0
  }
});
