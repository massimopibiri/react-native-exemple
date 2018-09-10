import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	white,
  pS,
  pM,
  pB,
  pXS,
  color10,
  color1,
  black
} from '../../global/variables';

const { width } = Dimensions.get('window');
const themeIconWidth = 48;

module.exports = StyleSheet.create({
  singleChallenge: {
  	alignSelf: 'center',
    padding: 10,
    position: 'relative',
    width: width - 30,
    paddingTop: 25,
    marginTop: 18
  },
  subThemeBox: {
  	backgroundColor: white
  },
  subTheme: {
  	marginTop: 23,
  	paddingHorizontal: 30,
    textAlign: 'center',
    fontSize: pS - 1,
    fontWeight: '700'
  },
  themeIcon: {
  	width: themeIconWidth,
  	height: themeIconWidth,
    position: 'absolute',
    top: 0,
    left: (width / 2) - (themeIconWidth / 2) - 15,
    borderRadius: themeIconWidth / 2,
    borderWidth: 2,
    borderColor: white
  },
  innerBox: {
    flex: 1,
    paddingBottom: 13,
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: white
  },
  padding: {
    paddingTop: 20
  },
  img: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    borderRadius: 45 / 2,
    marginBottom: 5
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  center: {
    marginTop: 6
  },
  challenge: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  challengeTxt: {
    fontSize: pB,
    fontWeight: '700',
    fontStyle: 'italic',
    color: black,
    backgroundColor: 'transparent'
  },
  vs: {
    flex: 1,
    width: 57,
    height: 57,
    marginTop: 0,
    alignSelf: 'center'
  },
  names: {
    textAlign: 'center',
    fontSize: pS - 1,
    fontWeight: '700'
  },
  betsBox: {
    backgroundColor: color10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  betsCenter: {
    fontSize: pS,
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 2,
    borderRightColor: '#dad2d9',
    borderLeftWidth: 2,
    borderLeftColor: '#dad2d9',
    color: black,
    backgroundColor: 'transparent'
  },
  betsLeft: {
    fontSize: pS,
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 2,
    borderRightColor: '#dad2d9',
    color: black,
    backgroundColor: 'transparent'
  },
  bets: {
    fontSize: pS,
    flex: 1,
    textAlign: 'center',
    justifyContent: 'flex-start',
    color: black,
    backgroundColor: 'transparent'
  },
  betBig: {
    fontSize: pB,
    fontWeight: '400'
  },
  finished: {
    fontSize: pS - 1,
    fontWeight: '700',
    textAlign: 'center'
  },
  freezeBox: {
    backgroundColor: white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: -1,
    paddingBottom: 10
  },
  btnFreezeBox: {
    flex: 1,
    justifyContent: 'center'
  },
  gap: {
    width: 57
  },
  btnFreeze: {
    backgroundColor: color1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20
  },
  btnFreezeTxt: {
    color: white,
    fontSize: pXS,
    backgroundColor: 'transparent'
  },
  involvement: {
  	color: black,
  	textAlign: 'center',
    backgroundColor: 'transparent'
  },
  bold: {
  	fontWeight: '700'
  }
});
