import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	padTop,
	pB,
	white,
	color1
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: padTop
  },
  emptyBox: {
  	marginTop: 40
  },
  emptyListTxt: {
  	color: white,
  	fontSize: pB,
  	textAlign: 'center',
  	paddingHorizontal: 30,
  	marginTop: 30,
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
  btnTxt: {
  	color: white,
    backgroundColor: 'transparent'
  },
  rankingBtnContainer: {
    alignItems: 'center'
  },
  downArrow: {
    width: 25,
    height: 25,
    marginBottom: 15
  }
});
