import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	white,
	pM,
	color1,
	black,
	grey
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');
const itemWidth = 280;
const itemHeight = 400;
const thumbWidth = 75;

module.exports = StyleSheet.create({
  base: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'contain'
  },
  item: {
    width: itemWidth,
    paddingTop: 55,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 8,
    backgroundColor: white
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: thumbWidth,
    height: thumbWidth,
    resizeMode: 'cover',
    borderWidth: 6,
    borderColor: grey,
    borderRadius: thumbWidth / 2
  },
  txt: {
  	fontSize: pM + 1,
  	fontWeight: '400',
  	paddingHorizontal: 15,
  	paddingTop: 15,
  	textAlign: 'center'
  },
  chooseBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  btnYes: {
  	backgroundColor: color1,
  	paddingVertical: 13,
  	width: (itemWidth / 5) * 3,
  	borderRadius: 25
  },
  waiting: {
  	backgroundColor: grey,
  	paddingVertical: 13,
  	width: (itemWidth / 5) * 3,
  	borderRadius: 25,
  	justifyContent: 'center',
  	alignItems: 'center',
  	alignSelf: 'center'
  },
  waitingTxt: {
  	color: black,
  	backgroundColor: 'transparent'
  },
  btnYesTxt: {
  	color: white,
  	backgroundColor: 'transparent'
  },
  btnNon: {
  	borderBottomColor: grey,
  	borderBottomWidth: 1
  },
  btnNonTxt: {
  	marginTop: 15,
  	fontWeight: '700',
  	fontSize: pM,
  	color: black,
  	backgroundColor: 'transparent'
  }
});
