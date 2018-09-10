import {
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	pM,
	white,
	black,
	color1
} from '../../global/variables';

const { width, height } = Dimensions.get('screen');

module.exports = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: width,
    width: width,
    marginTop: 100
  },
  btnBox: {
  	flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
  	backgroundColor: color1,
  	paddingHorizontal: 25,
  	height: 50,
  	borderRadius: 25,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  btnTxt: {
  	color: white,
    backgroundColor: 'transparent'
  }
});
