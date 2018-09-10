import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
  white,
  pB,
  h2,
  color1,
  color12,
  padTop,
  grey,
  black
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');
const picture = 92;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: padTop
  },
  opponentBox: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  opponentImg: {
    height: picture,
    width: picture,
    borderRadius: picture / 2,
    borderColor: color12,
    borderWidth: 4,
    marginTop: 20,
    marginBottom: 10
  },
  img: {
  	flex: 1,
    width: null,
    height: null,
    borderRadius: picture / 2,
    resizeMode: 'cover'
  },
  opponentText: {
    marginTop: 60,
    marginBottom: 20,
    color: white,
    fontSize: pB + 1,
    backgroundColor: 'transparent'
  },
  opponentName: {
    color: white,
    fontSize: pB - 1,
    marginTop: -4,
    fontWeight: '700',
    backgroundColor: 'transparent'
  },
  detailsBox: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  txtSimple: {
    fontSize: pB + 1,
    color: white,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  txtBold: {
    fontSize: h2,
    fontWeight: '700',
    color: white,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  btn: {
    backgroundColor: color1,
    alignSelf: 'center',
    height: 50,
    width: (width / 3) * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 80,
    marginBottom: 50
  },
  btnDis: {
    backgroundColor: grey,
    alignSelf: 'center',
    height: 50,
    width: (width / 3) * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 80,
    marginBottom: 50
  },
  btnTxt: {
  	color: white,
    backgroundColor: 'transparent'
  },
  btnTxtDis: {
  	color: black,
    backgroundColor: 'transparent'
  }
});
