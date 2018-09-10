import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	pS,
	pB,
	pM,
	h1,
  h3,
	white,
  grey,
  black,
	color1,
	color12,
	padTop
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

const marginGen = 30;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: padTop
  },
  titleBox: {
    height: 30,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  title: {
    fontSize: pB,
    color: white,
    backgroundColor: 'transparent'
  },
  btn: {
  	marginTop: 30,
  	paddingHorizontal: 25,
  	alignSelf: 'center',
  	height: 50,
  	borderRadius: 25,
  	backgroundColor: color1,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  btnTxt: {
  	color: white,
    backgroundColor: 'transparent'
  }
});
