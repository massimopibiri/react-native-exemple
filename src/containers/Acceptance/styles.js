import {
	StyleSheet
} from 'react-native';
import {
	h3,
	pM,
	pB,
	white,
	color1,
	color12,
	padTop,
	grey,
	black,
	pS
} from '../../global/variables';

const imgWidth = 100;

module.exports = StyleSheet.create({
  container: {
    paddingTop: padTop,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  argument: {
    paddingTop: 60,
    paddingBottom: 40,
    textAlign: 'center',
    color: white,
    fontSize: h3,
    backgroundColor: 'transparent'
  },
  img: {
    height: imgWidth,
    width: imgWidth,
    borderRadius: imgWidth / 2,
    borderColor: color12,
    borderWidth: 5,
    alignSelf: 'center',
    marginBottom: 5
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: white,
    marginTop: -3,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  introDett: {
    fontSize: h3,
    color: white,
    marginTop: 20,
    fontWeight: '300',
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: 'transparent'
  },
  theme: {
    fontSize: pB,
    fontWeight: '700',
    paddingTop: 0,
    paddingBottom: 10,
    color: white,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  dettWrt: {
    fontSize: pB,
    color: white,
    textAlign: 'center',
    fontWeight: '300',
    paddingBottom: 20,
    backgroundColor: 'transparent'
  },
  dettBold: {
    fontWeight: '700',
    fontSize: h3
  },
  buttonBox: {
  	marginTop: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btn: {
  	backgroundColor: color1,
  	width: 130,
  	paddingVertical: 12,
  	borderRadius: 25
  },
  waiting: {
  	backgroundColor: grey,
  	width: 130,
  	paddingVertical: 12,
  	borderRadius: 25,
  	alignItems: 'center',
  	justifyContent: 'center',
  	alignSelf: 'center'
  },
  waitingTxt: {
  	color: black,
    backgroundColor: 'transparent'
  },
  btnTxt: {
  	color: white,
    backgroundColor: 'transparent'
  },
  refuse: {
  	color: white,
  	fontWeight: '300',
  	marginVertical: 25,
    backgroundColor: 'transparent'
  },
  noPossibleRelaunch: {
  	paddingVertical: 20,
  	paddingHorizontal: 20,
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  noPossibleRelaunchTxt: {
  	color: white,
    backgroundColor: 'transparent',
    fontSize: pM,
    textAlign: 'center'
  },
  warningBox: {
  	paddingVertical: 20,
  	paddingHorizontal: 20,
  	marginBottom: 15,
  	marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  warningTxt: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: pB,
    color: white,
    marginVertical: 5
  },
  warningLittle: {
    textAlign: 'center',
    fontWeight: '300',
    fontSize: pS,
    color: white
  }
});
